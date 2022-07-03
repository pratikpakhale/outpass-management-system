const jwt = require('jsonwebtoken')

const FacultyAdvisor = require('../models/facultyAdvisor')
const StudentLifeCoordinator = require('../models/studentLifeCoordinator')

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

    const facultyAdvisor = await FacultyAdvisor.findById(decodedToken.id)

    const studentLifeCoordinator = await StudentLifeCoordinator.findById(
      decodedToken.id
    )

    if (!facultyAdvisor && !studentLifeCoordinator) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    req.institute = facultyAdvisor.institute
    req.facultyAdvisorID = facultyAdvisor._id

    next()
  } catch (err) {
    err.statusCode = 401
    next(err)
  }
}
