const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  studied: String,
  department_id: String,
  employment_date: Date,
  employment_status: String,
  total_leaves: Number,
  photo: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
