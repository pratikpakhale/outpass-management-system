const { validationResult } = require('express-validator')

const Outpass = require('../models/outpass')
const Student = require('../models/student')
const StudentLifeCoordinator = require('../models/studentLifeCoordinator')

exports.createOutpass = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    })
  }

  const student = req.studentID

  const studentDetails = await Student.findById(student)

  if (!studentDetails) {
    return res.status(404).json({
      message: 'Student not found.',
    })
  }

  const { warden, facultyAdvisor, institute } = studentDetails

  const slc = await StudentLifeCoordinator.find({ institute })

  if (!slc) {
    return res.status(404).json({
      message: 'Student life coordinator not found.',
    })
  }

  const outpass = new Outpass({
    student: student,
    warden: {
      id: warden._id,
    },
    facultyAdvisor: {
      id: facultyAdvisor._id,
    },
    studentLifeCoordinator: {
      id: slc._id,
    },
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    status: 'pending',
    outTime: req.body.outTime,
    inTime: req.body.inTime,
    days: req.body.days,
    reason: req.body.reason,
  })

  try {
    await outpass.save()
    res.status(201).json({ message: 'Outpass created successfully.', outpass })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getOutpass = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id).populate('student')

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  res.status(200).json({ message: 'Outpass fetched.', outpass })
}

exports.getOutpasses = async (req, res, next) => {
  const outpasses = await Outpass.find({})

  if (!outpasses) {
    return res.status(404).json({
      message: 'Outpasses not found.',
    })
  }

  res.status(200).json({ message: 'Outpasses fetched.', outpasses })
}

exports.getStudentOutpasses = async (req, res, next) => {
  try {
    const outpasses = await Outpass.find({
      student: req.studentID,
    })

    if (!outpasses) {
      return res.status(404).json({
        message: 'Outpasses not found.',
      })
    }

    res.status(200).json({ message: 'Outpasses fetched.', outpasses })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getFacultyAdvisorOutpasses = async (req, res, next) => {
  try {
    const outpasses = await Outpass.find({
      'facultyAdvisor.id': req.facultyAdvisorID.toString(),
    }).populate('student')

    if (!outpasses) {
      return res.status(404).json({
        message: 'Outpasses not found.',
      })
    }

    res.status(200).json({ message: 'Outpasses fetched.', outpasses })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getWardenOutpasses = async (req, res, next) => {
  try {
    const outpasses = await Outpass.find({
      'warden.id': req.wardenID,
    }).populate('student')

    if (!outpasses) {
      return res.status(404).json({
        message: 'Outpasses not found.',
      })
    }

    res.status(200).json({ message: 'Outpasses fetched.', outpasses })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getSLCOutpasses = async (req, res, next) => {
  try {
    const outpasses = await Outpass.find({
      'studentLifeCoordinator.id': req.studentLifeCoordinatorID,
    }).populate('student')

    if (!outpasses) {
      return res.status(404).json({
        message: 'Outpasses not found.',
      })
    }

    res.status(200).json({ message: 'Outpasses fetched.', outpasses })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.faApproval = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)
  const { days } = outpass

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.facultyAdvisor.approved = true
  outpass.facultyAdvisor.rejected = false

  if (days < 10) {
    outpass.status = 'approved'
  }

  try {
    await outpass.save()
    res.status(200).json({
      message: 'Outpass approved by faculty advisor successfully.',
      outpass,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.faRejection = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.facultyAdvisor.rejected = true
  outpass.facultyAdvisor.approved = false

  outpass.status = 'rejected'

  try {
    await outpass.save()
    res.status(200).json({ message: 'Outpass approved successfully.', outpass })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.wardenApproval = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.warden.approved = true
  outpass.warden.rejected = false

  try {
    await outpass.save()
    res
      .status(200)
      .json({ message: 'Outpass approved by warden successfully.', outpass })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.wardenRejection = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.warden.rejected = true
  outpass.warden.approved = false

  outpass.status = 'rejected'

  try {
    await outpass.save()
    res.status(200).json({ message: 'Outpass approved successfully.', outpass })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.slcApproval = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.studentLifeCoordinator.approved = true
  outpass.studentLifeCoordinator.rejected = false
  outpass.status = 'approved'

  try {
    await outpass.save()
    res.status(200).json({
      message: 'Outpass approved by student life coordinator successfully.',
      outpass,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.slcRejection = async (req, res, next) => {
  const outpass = await Outpass.findById(req.params.id)

  if (!outpass) {
    return res.status(404).json({
      message: 'Outpass not found.',
    })
  }

  outpass.studentLifeCoordinator.rejected = true
  outpass.studentLifeCoordinator.approved = false
  outpass.status = 'rejected'

  try {
    await outpass.save()
    res.status(200).json({ message: 'Outpass approved successfully.', outpass })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
