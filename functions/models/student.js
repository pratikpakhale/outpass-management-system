const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
  facultyAdvisor: {
    type: Schema.Types.ObjectId,
    ref: 'FacultyAdvisor',
    required: true,
  },
  warden: {
    type: Schema.Types.ObjectId,
    ref: 'Warden',
    required: true,
  },
  // photoUrl: {
  //   type: String,
  // },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
})

module.exports = mongoose.model('Student', studentSchema)
