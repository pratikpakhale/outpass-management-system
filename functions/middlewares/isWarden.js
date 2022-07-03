const jwt = require('jsonwebtoken')

const Warden = require('../models/warden')

require('dotenv').config()

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    return next(error)
  }

  const token = authHeader.split(' ')[1]
  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY)

    if (!decodedToken) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    const warden = await Warden.findById(decodedToken.id)
    if (!warden) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    req.institute = warden.institute
    req.wardenID = warden._id

    next()
  } catch (err) {
    err.statusCode = 401
    next(err)
  }
}
