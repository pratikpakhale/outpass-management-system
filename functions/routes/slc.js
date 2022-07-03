const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student')
const wardenController = require('../controllers/warden')
const facultyAdvisorController = require('../controllers/facultyAdvisor')
const studentLifeCoordinatorController = require('../controllers/studentLifeCoordinator')
const outpassController = require('../controllers/outpass')

router.get('/', studentLifeCoordinatorController.getSLC)

//student routes
router.get('/students', studentController.getSLCStudents)
router.get('/students/:id', studentController.getStudent)

router.post('/students', studentController.addStudent)
router.put('/students/:id', studentController.updateStudent)

router.delete('/students/:id', studentController.deleteStudent)

// warden routes
router.get('/wardens', wardenController.getWardens)
router.get('/wardens/:id', wardenController.getWarden)

router.post('/wardens', wardenController.addWarden)
router.put('/wardens/:id', wardenController.updateWarden)

router.delete('/wardens/:id', wardenController.deleteWarden)

// faculty advsior routes
router.get('/facultyAdvisors', facultyAdvisorController.getFacultyAdvisors)
router.get('/facultyAdvisors/:id', facultyAdvisorController.getFacultyAdvisor)

router.post('/facultyAdvisors', facultyAdvisorController.addFacultyAdvisor)
router.put(
  '/facultyAdvisors/:id',
  facultyAdvisorController.updateFacultyAdvisor
)

router.delete(
  '/facultyAdvisors/:id',
  facultyAdvisorController.deleteFacultyAdvisor
)

router.get('/outpasses', outpassController.getSLCOutpasses)

router.get('/outpasses/:id', outpassController.getOutpass)

router.get('/outpasses/:id/approve', outpassController.slcApproval)
router.get('/outpasses/:id/reject', outpassController.slcRejection)

module.exports = router
