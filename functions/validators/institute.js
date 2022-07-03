const { body } = require('express-validator')

exports.addInstitute = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 1000 })
    .withMessage('Name must be between 3 and 1000 characters'),

  body('website')
    .notEmpty()
    .withMessage('Website is required')
    .isURL()
    .withMessage('Website must be a valid URL'),

  // body('photoUrl')
  //   .notEmpty()
  //   .withMessage('Photo URL is required')
  //   .isURL()
  //   .withMessage('Photo URL must be a valid URL'),
]
