const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('./queries')
const activity = require('./services/activity')

// Const port = process.env.PORT || 5000
const app = express()

const auth = require('./middleware/auth')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// App.use(express.static(path.join(__dirname, 'public')))

setInterval(() => activity(), 60000)

app.post('/api/transfer', db.addTransfer, (req, res) => {
  res.send('Good transer')
})
app.get('/api/transactions', db.transactions, (req, res) => {

})
app.post('/api/login', db.updateUser, async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { walletAddress } = req.body

    // Validate user input
    if (!(walletAddress)) {
      res.status(400).send('All input is required')
    }

    const user = {_id: 100, walletAddress: walletAddress}
    if (walletAddress) {
      const token = jwt.sign(
        { user_id: user._id, walletAddress },
        'process.env.TOKEN_KEY',
        {
          expiresIn: '2h'
        }
      )

      // Save user token
      user.token = token

      // User
      res.status(200).json(user)
    }
    // Res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
  }
  // Our register logic ends here
})

// ...
app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ')
})
app.get('/api/lastblock', (req, res) => {
  console.log('read last block')
  res.status(200).json({ block: 399999 })
})
app.get('/test', (req, res) => {
  res.send('<h1 style="margin-top: 40vh;text-align: center;">This is Oasis node server</h1>')
})

module.exports = app