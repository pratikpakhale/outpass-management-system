const { validationResult } = require('express-validator')
const FacultyAdvisor = require('../models/facultyAdvisor')

exports.addFacultyAdvisor = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.')
      error.statusCode = 422
      error.data = errors.array()
      return next(error)
    }
    const fa = await FacultyAdvisor.findOne({
      email: req.body.email,
    })

    if (fa) {
      const error = new Error('Faculty Advisor already exists.')
      error.statusCode = 422
      return next(error)
    }

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      institute: req.institute,
      phoneNumber: req.body.phoneNumber,
      profileUrl: req.body.profileUrl,
    }

    const facultyAdvisor = new FacultyAdvisor(data)

    await facultyAdvisor.save()
    res
      .status(201)
      .json({ message: 'Faculty Advisor added successfully.', facultyAdvisor })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateFacultyAdvisor = async (req, res, next) => {
  const facultyAdvisor = await FacultyAdvisor.findById(req.params.id)
  if (!facultyAdvisor) {
    const error = new Error('Could not find Faculty Advisor.')
    error.statusCode = 404
    throw error
  }

  facultyAdvisor.name = req.body.name
  if (req.body.password) {
    facultyAdvisor.password = req.body.password
  }
  facultyAdvisor.phoneNumber = req.body.phoneNumber
  facultyAdvisor.profileUrl = req.body.profileUrl

  try {
    await facultyAdvisor.save()
    res.status(200).json({
      message: 'Faculty Advisor updated successfully.',
      facultyAdvisor,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getFacultyAdvisor = async (req, res, next) => {
  const facultyAdvisor = await FacultyAdvisor.findById(req.params.id)
  if (!facultyAdvisor) {
    const error = new Error('Could not find Faculty Advisor.')
    error.statusCode = 404
    throw error
  }

  res
    .status(200)
    .json({ message: 'Faculty Advisor found successfully.', facultyAdvisor })
}

exports.getFacultyAdvisorSelf = async (req, res, next) => {
  const facultyAdvisor = await FacultyAdvisor.findById(req.facultyAdvisorID)
  if (!facultyAdvisor) {
    const error = new Error('Could not find Faculty Advisor.')
    error.statusCode = 404
    throw error
  }

  res
    .status(200)
    .json({ message: 'Faculty Advisor found successfully.', facultyAdvisor })
}

exports.getFacultyAdvisors = async (req, res, next) => {
  try {
    const facultyAdvisors = await FacultyAdvisor.find({
      institute: req.institute,
    })
    res.status(200).json({
      message: 'Faculty Advisors found successfully.',
      facultyAdvisors,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteFacultyAdvisor = async (req, res, next) => {
  const facultyAdvisor = await FacultyAdvisor.findById(req.params.id)
  if (!facultyAdvisor) {
    const error = new Error('Could not find Faculty Advisor.')
    error.statusCode = 404
    throw error
  }

  try {
    await facultyAdvisor.remove()
    res.status(200).json({ message: 'Faculty Advisor deleted successfully.' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
