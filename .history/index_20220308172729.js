const http = require('http')
const app = require('./app')
require('dotenv').config()
const server = http.createServer(app)

// const { API_PORT } = process.env
const port = process.env.PORT || process.env

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
