const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instituteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  // photoUrl: {
  //   type: String,
  //   required: true,
  // },
})

module.exports = mongoose.model('Institute', instituteSchema)
