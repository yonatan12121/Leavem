const mongoose = require("mongoose");

const NotificationScehma = new mongoose.Schema(
  {
    text:String,
    name:String,
    type:String,
    Date:{
      type: Date,
      default: Date.now,
    }
    
  }
)

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
  Notification:[NotificationScehma],
  photo: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
