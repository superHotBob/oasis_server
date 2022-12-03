
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('./queries')
const activity = require('./services/activity')

const app = express()

// Const auth = require('./middleware/auth')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// setInterval(() => activity(), 60000000)
activity()
app.post('/api/minting', db.writeMinting, (req, res) => {

})
app.post('/api/transfer', db.addTransfer, (req, res) => {

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

    if (walletAddress) {
    //   Const refreshToken = jwt.sign({ walletAddress }, '09f26e402586e2faa8', {
    //     ExpiresIn: '1h'
    //   })
      const token = jwt.sign(
        { walletAddress },
        '09f26e402586e2faa8da4c98a35f1b20d6b033c60',
        { expiresIn: '10m' }
      )
      // Save user token

      //   Console.log( token)

      // User
      res.status(200).json(token)
    }
    // Res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
  }
  // Our register logic ends here
})

app.get('/test', (req, res) => {
  res.send('<h1 style="margin-top: 40vh;text-align: center;">This is Oasis node server</h1>')
})

module.exports = app
