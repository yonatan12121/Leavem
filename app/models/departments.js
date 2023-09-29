const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
