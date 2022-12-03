const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => { 
  const token =
    req.body.token || req.query.token || req.headers.authorization

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c60')
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

module.exports = verifyToken
