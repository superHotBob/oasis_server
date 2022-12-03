const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')
const db = require('./queries')
const activity = require('./services/activity')

const port = process.env.PORT || 5000
const app = express()

const auth = require('./middleware/auth')

app.use(cors())
app.use(activity)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// App.use(express.static(path.join(__dirname, 'public')))

// Const nftcreate = require('./services/nftcreate.js')
// Const mintnft = require('./services/mintnft.js')
// Const main = require('./services/deploy.js')

// Force all requests on production to be served over https
// App.get('/users', db.getUsers)
// App.post('/api/tokens', (req, res) => {
//   Console.log(req.body)
//   Res.status(200).send({ message: 'This is  token' })
// })
app.post('/api/transfer', db.addTransfer, (req, res) => {
  res.send('Good transer')
})
app.post('/api/transactions', (req, res) => {
  res.send('Hello bob')
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

module.exports = app

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
