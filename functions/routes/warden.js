const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student')
const wardenController = require('../controllers/warden')
const outpassController = require('../controllers/outpass')

router.get('/', wardenController.getWardenSelf)

router.get('/students', studentController.getWardenStudents)

router.get('/outpasses', outpassController.getWardenOutpasses)

router.get('/outpasses/:id', outpassController.getOutpass)

router.get('/outpasses/:id/approve', outpassController.wardenApproval)
router.get('/outpasses/:id/reject', outpassController.wardenRejection)

module.exports = router
