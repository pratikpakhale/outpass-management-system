const { body } = require('express-validator')

exports.addFacultyAdvisor = [
  body('name')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('name must be between 1 and 100 characters'),

  body('email')
    .isEmail()
    .withMessage('email must be a valid email address')
    .isLength({ min: 1, max: 100 })
    .withMessage('email must be between 1 and 100 characters'),

  body('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('password must be between 1 and 100 characters'),

  // body('photoUrl')
  //   .isUrl()
  //   .withMessage('photoUrl must be a valid url')
  //   .isLength({ min: 1, max: 1000 })
  //   .withMessage('photoUrl must be between 1 and 1000 characters'),
  body('profileUrl')
    .isLength({ min: 1, max: 1000 })
    .withMessage('profileUrl must be between 1 and 1000 characters'),
  body('phoneNumber')
    .isNumeric()
    .withMessage('phoneNumber must be a number')
    .isLength({ min: 1, max: 10 })
    .withMessage('phoneNumber must be between 1 and 100 characters'),
]

exports.updateFacultyAdvisor = [
  body('name')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('name must be between 1 and 100 characters'),

  body('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('password must be between 1 and 100 characters'),

  // body('photoUrl')
  //   .isUrl()
  //   .withMessage('photoUrl must be a valid url')
  //   .isLength({ min: 1, max: 1000 })
  //   .withMessage('photoUrl must be between 1 and 1000 characters'),
  body('profileUrl')
    .isLength({ min: 1, max: 1000 })
    .withMessage('profileUrl must be between 1 and 1000 characters'),
  body('phoneNumber')
    .isNumeric()
    .withMessage('phoneNumber must be a number')
    .isLength({ min: 1, max: 10 })
    .withMessage('phoneNumber must be between 1 and 100 characters'),
]
