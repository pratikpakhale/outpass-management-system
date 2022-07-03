const mongoose = require('mongoose')
const Schema = mongoose.Schema

const outpassSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    warden: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Warden',
      },
      approved: {
        type: Boolean,
        default: false,
      },
      rejected: {
        type: Boolean,
        default: false,
      },
    },
    facultyAdvisor: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'FacultyAdvisor',
      },
      approved: {
        type: Boolean,
        default: false,
      },
      rejected: {
        type: Boolean,
        default: false,
      },
    },

    studentLifeCoordinator: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'StudentLifeCoordinator',
      },
      approved: {
        type: Boolean,
        default: false,
      },
      rejected: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    outTime: {
      type: String,
      required: true,
    },
    inTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Outpass', outpassSchema)
