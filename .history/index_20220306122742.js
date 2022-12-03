const path = require('path')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 5000
const app = express()

const auth = require('./middleware/auth')

app.use(cors())

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// App.use(express.static(path.join(__dirname, 'public')))

// Const nftcreate = require('./services/nftcreate.js')
// Const mintnft = require('./services/mintnft.js')
// Const main = require('./services/deploy.js')

// Force all requests on production to be served over https

app.post('/api/tokens', (req, res) => {
  console.log(req.body)
  res.status(200).send({ message: 'This is  token' })
})

app.post('/api/login', async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { walletAddress } = req.body

    // Validate user input
    if (!(walletAddress)) {
      res.status(400).send('All input is required')
    }
    // Validate if user exist in our database
    // const user = await User.findOne({ walletAddress })
    const user = {_id: 100, walletAddress: '0xce6968bC30C1Dee5741C2b2790440C18bD0DE03f'}
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
    // res.status(400).send('Invalid Credentials')
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
