const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  leave_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeaveType",
  },
  start_date: Date,
  end_date: Date,
  reason: String,
  approver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  remarks: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
