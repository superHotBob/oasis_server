const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')

const helmet = require('helmet')

// Load environment variables using dotenv
require('dotenv').config({ path: 'variables.env' })

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Const nftcreate = require('./services/nftcreate.js')
// Const mintnft = require('./services/mintnft.js')
// Const main = require('./services/deploy.js')

// Force all requests on production to be served over https




app.post('/api/tokens', (req, res) => {
  console.log(req.body)
  res.status(200).send({ message: 'This is  token' })
})


app.get('/*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/public', 'index.html'))
})


app.use(express.static(path.join(__dirname, '/public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
