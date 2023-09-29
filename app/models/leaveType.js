const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const LeaveType = mongoose.model("LeaveType", leaveTypeSchema);

module.exports = LeaveType;
