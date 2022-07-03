const StudentLifeCoordinator = require('../models/studentLifeCoordinator')

exports.getSLC = async (req, res, next) => {
  try {
    const slc = await StudentLifeCoordinator.findById(
      req.StudentLifeCoordinatorID
    )
    if (!slc) {
      const error = new Error('Could not find Student Life Coordinator.')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ slc })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
