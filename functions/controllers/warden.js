const { validationResult } = require('express-validator')
const Warden = require('../models/warden')

exports.addWarden = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const warden = new Warden({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    institute: req.institute,
    phoneNumber: req.body.phoneNumber,
    profileUrl: req.body.profileUrl,
  })

  try {
    await warden.save()
    res.status(201).json({ message: 'Warden added successfully.', warden })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateWarden = async (req, res, next) => {
  const warden = await Warden.findById(req.params.id)
  if (!warden) {
    const error = new Error('Could not find Warden.')
    error.statusCode = 404
    throw error
  }

  warden.name = req.body.name
  if (req.body.password) {
    warden.password = req.body.password
  }
  warden.phoneNumber = req.body.phoneNumber
  warden.profileUrl = req.body.profileUrl

  try {
    await warden.save()
    res.status(200).json({ message: 'Warden updated successfully.', warden })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getWarden = async (req, res, next) => {
  const warden = await Warden.findById(req.params.id)
  if (!warden) {
    const error = new Error('Could not find Warden.')
    error.statusCode = 404
    throw error
  }

  res.status(200).json({ message: 'Warden found.', warden })
}
exports.getWardenSelf = async (req, res, next) => {
  const warden = await Warden.findById(req.wardenID)
  if (!warden) {
    const error = new Error('Could not find Warden.')
    error.statusCode = 404
    throw error
  }

  res.status(200).json({ message: 'Warden found.', warden })
}

exports.getWardens = async (req, res, next) => {
  try {
    const wardens = await Warden.find({ institute: req.institute })
    res.status(200).json({ message: 'Wardens found.', wardens })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteWarden = async (req, res, next) => {
  const warden = await Warden.findById(req.params.id)
  if (!warden) {
    const error = new Error('Could not find Warden.')
    error.statusCode = 404
    throw error
  }

  try {
    await warden.remove()
    res.status(200).json({ message: 'Warden deleted successfully.' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
