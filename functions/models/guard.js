const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guardSchema = new Schema({
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
  },
})
