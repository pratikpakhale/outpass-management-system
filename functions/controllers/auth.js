const jwt = require('jsonwebtoken')
require('dotenv').config()

const Student = require('../models/student')
const FacultyAdvisor = require('../models/facultyAdvisor')
const Warden = require('../models/warden')
const StudentLifeCoordinator = require('../models/studentLifeCoordinator')
const Institute = require('../models/institute')

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const student = await Student.findOne({ email: email })
    if (student) {
      if (student.password === password) {
        const token = jwt.sign(
          {
            id: student._id,
            email: student.email,
            role: 'student',
          },
          process.env.JWT_KEY,
          {
            expiresIn: '15d',
          }
        )
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          id: student._id,
          email: student.email,
          role: 'student',
        })
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }
    }
    const facultyAdvisor = await FacultyAdvisor.findOne({ email: email })
    if (facultyAdvisor) {
      if (facultyAdvisor.password === password) {
        const token = jwt.sign(
          {
            id: facultyAdvisor._id,
            name: facultyAdvisor.name,
            email: facultyAdvisor.email,
            role: 'facultyAdvisor',
          },
          process.env.JWT_KEY,
          {
            expiresIn: '15d',
          }
        )
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          id: facultyAdvisor._id,
          name: facultyAdvisor.name,
          email: facultyAdvisor.email,
          role: 'facultyAdvisor',
        })
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }
    }

    const warden = await Warden.findOne({ email: email })
    if (warden) {
      if (warden.password === password) {
        const token = jwt.sign(
          {
            id: warden._id,
            name: warden.name,
            email: warden.email,
            role: 'warden',
          },
          process.env.JWT_KEY,
          {
            expiresIn: '15d',
          }
        )
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          id: warden._id,
          name: warden.name,
          email: warden.email,
          role: 'warden',
        })
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }
    }

    const studentLifeCoordinator = await StudentLifeCoordinator.findOne({
      email: email,
    })
    if (studentLifeCoordinator) {
      if (studentLifeCoordinator.password === password) {
        const token = jwt.sign(
          {
            id: studentLifeCoordinator._id,
            name: studentLifeCoordinator.name,
            email: studentLifeCoordinator.email,
            role: 'studentLifeCoordinator',
          },
          process.env.JWT_KEY,
          {
            expiresIn: '15d',
          }
        )
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          id: studentLifeCoordinator._id,
          name: studentLifeCoordinator.name,
          email: studentLifeCoordinator.email,
          role: 'studentLifeCoordinator',
        })
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        })
      }
    } else {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.register = async (req, res, next) => {
  try {
    const instituteName = req.body.instituteName
    const instituteWebsite = req.body.instituteWebsite

    let institute = await Institute.findOne({ name: instituteName })
    if (institute) {
      return res.status(400).json({
        message: 'Institute already exists',
      })
    }

    institute = await Institute.findOne({ website: instituteWebsite })
    if (institute) {
      return res.status(400).json({
        message: 'Institute already exists',
      })
    }

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phoneNumber = req.body.phoneNumber
    const profileUrl = req.body.profileUrl

    if (!name || !email || !password || !phoneNumber || !profileUrl) {
      return res.status(400).json({
        message: 'Please provide all the required fields',
      })
    }

    institute = new Institute({
      name: instituteName,
      website: instituteWebsite,
    })

    const instituteResponse = await institute.save()
    const slc = new StudentLifeCoordinator({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      profileUrl: profileUrl,
      institute: instituteResponse._id,
    })

    const slcResponse = await slc.save()

    res.status(201).json({
      message: 'Student Life Coordinator and Institute registered successfully',
      slc: slcResponse,
      institute: instituteResponse,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
