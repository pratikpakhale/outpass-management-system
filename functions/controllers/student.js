const { validationResult } = require('express-validator')

const Student = require('../models/student')

exports.addStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.')
      error.statusCode = 422
      error.data = errors.array()
      return next(error)
    }

    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      institute: req.institute,
      phoneNumber: req.body.phoneNumber,
      facultyAdvisor: req.body.facultyAdvisor,
      warden: req.body.warden,
      gender: req.body.gender,
    })

    await student.save()
    res.status(201).json({ message: 'Student added successfully.', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateStudent = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      facultyAdvisor: req.body.facultyAdvisor,
      warden: req.body.warden,
      gender: req.body.gender,
    }
    if (req.body.password) {
      data.password = req.body.password
    }
    const student = await Student.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    })
    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      return next(error)
    }
    res.status(200).json({ message: 'Student updated successfully.', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getStudent = async (req, res, next) => {
  const student = await Student.findById(req.params.id)
  if (!student) {
    const error = new Error('Could not find student.')
    error.statusCode = 404
    return next(error)
  }
  res.status(200).json({ message: 'Student fetched.', student })
}

exports.getStudentSelf = async (req, res, next) => {
  const student = await Student.findById(req.studentID).populate(
    'facultyAdvisor'
  )
  if (!student) {
    const error = new Error('Could not find student.')
    error.statusCode = 404
    return next(error)
  }
  res.status(200).json({ message: 'Student fetched.', student })
}

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      return next(error)
    }
    res.status(200).json({ message: 'Student deleted successfully.', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getFaStudents = async (req, res, next) => {
  const students = await Student.find({ facultyAdvsior: req.facultyAdvisorID })
  if (!students) {
    const error = new Error('Could not find students.')
    error.statusCode = 404
    return next(error)
  }
  res.status(200).json({ message: 'Students fetched.', students })
}

exports.getWardenStudents = async (req, res, next) => {
  const students = await Student.find({ warden: req.wardenID })
  if (!students) {
    const error = new Error('Could not find students.')
    error.statusCode = 404
    return next(error)
  }
  res.status(200).json({ message: 'Students fetched.', students })
}

exports.getSLCStudents = async (req, res, next) => {
  const students = await Student.find({
    institute: req.instituteID,
  }).populate('facultyAdvisor')
  if (!students) {
    const error = new Error('Could not find students.')
    error.statusCode = 404
    return next(error)
  }
  res.status(200).json({ message: 'Students fetched.', students })
}
