const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student')
const outpassController = require('../controllers/outpass')

router.get('/', studentController.getStudentSelf)

router.get('/outpasses', outpassController.getStudentOutpasses)
router.get('/outpasses/:id', outpassController.getOutpass)

router.post('/outpass/apply', outpassController.createOutpass)

module.exports = router
