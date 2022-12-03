
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('./queries')
const activity = require('./services/activity')

const app = express()

const auth = require('./middleware/auth')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

setInterval(() => activity(), 60000)
app.post('/api/minting', db.writeMinting, (req, res) => {

})
app.post('/api/transfer', db.addTransfer, (req, res) => {

})
app.get('/api/transactions', auth, db.transactions, (req, res) => {

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
        { walletAddress },
        'secret',
        {
          expiresIn: '1h'
        }
      )
      // Save user token
      user.token = token
      console.log(token)

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
