const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  Id:String,
  leave_type: String,
  duration:String,
  start_date: Date,
  end_date: Date,
  reason: String,
  photo: String,
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
