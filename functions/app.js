const express = require('express')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')

require('dotenv').config()

require('./db/db')

const app = express()

app.use(bodyParser.json())

// middlewares
const errorHandler = require('./middlewares/errorHandler')
const isSLC = require('./middlewares/isSLC')
const isStudent = require('./middlewares/isStudent')
const isFacultyAdvisor = require('./middlewares/isFacultyAdvisor')
const isWarden = require('./middlewares/isWarden')

// routes
const authRouter = require('./routes/auth')
const slcRouter = require('./routes/slc')
const studentRouter = require('./routes/student')
const facultyAdvisorRouter = require('./routes/fa')
const wardenRouter = require('./routes/warden')

// allow cross origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/*auth', authRouter)
app.use('/*slc', isSLC, slcRouter)
app.use('/*student', isStudent, studentRouter)
app.use('/*facultyAdvisor', isFacultyAdvisor, facultyAdvisorRouter)
app.use('/*warden', isWarden, wardenRouter)

// 404 handler
app.use(errorHandler.get404)

// global error handler
app.use(errorHandler.global)

exports.handler = serverless(app)
