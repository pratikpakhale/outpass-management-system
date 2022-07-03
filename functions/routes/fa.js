const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student')
const facultyAdvisorController = require('../controllers/facultyAdvisor')
const outpassController = require('../controllers/outpass')

router.get('/', facultyAdvisorController.getFacultyAdvisorSelf)

router.get('/mentees', studentController.getFaStudents)

router.get('/outpasses', outpassController.getFacultyAdvisorOutpasses)

router.get('/outpasses/:id', outpassController.getOutpass)

router.get('/outpasses/:id/approve', outpassController.faApproval)
router.get('/outpasses/:id/reject', outpassController.faRejection)

module.exports = router
