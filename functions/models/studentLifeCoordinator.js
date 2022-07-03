const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentLifeCoordinatorSchema = new Schema({
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
  // photoUrl: {
  //   type: String,
  //   required: true,
  // },
  phoneNumber: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model(
  'StudentLifeCoordinator',
  studentLifeCoordinatorSchema
)
