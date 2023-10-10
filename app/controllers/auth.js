const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const bcrypt = require("bcryptjs");
const { omit } = require('lodash');

// Controller: User login
const login = async (req, res) => {
  const { email, password } = req.body;
console.log(email, password);
console.log("hellooo");
const Id = email;
  //find the user by email
  const user = await User.findOne({ Id });
  console.log(user);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    //compare the provided password
    if (await bcrypt.compare(password, user.password)) {
      const userWithoutPassword = {
        Id: user.Id,
        Notification: user.Notification,
        created_at: user.created_at,
        department_id: user.department_id,
        email: user.email,
        employment_date: user.employment_date,
        name: user.name,
        photo: user.photo,
        role: user.role,
        studied: user.studied,
        total_leaves: user.total_leaves,
        __v: user.__v,
        _id: user._id,
        // Add other fields you want to include
      };
      console.log("User befor deletion:", user);
      // delete user.password;
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          data:userWithoutPassword
        },
        process.env.JWT_SECRET,
        { expiresIn: "9h" }
      );
      console.log("User befor deletion:", userWithoutPassword);

      return res.status(200).json({ token: token });
    } else {
      console.log("wrong password");
      return res.status(400).json({ msg: "wrong password" });
    }
 
};


const ResetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    console.log(newPassword, email);
    const encreptedPassword = await bcrypt.hash(newPassword, 10);
console.log(encreptedPassword);
    const existingUser = await User.findOne({ email });
if (!existingUser) {
return res.status(404).json({ message: 'User not found' });
}

    // Use the updateOne method with async/await
    const result = await User.updateOne(
      { email: email },
      { $set: { password: encreptedPassword } }
    );
      console.log(result);
    // Check the result and handle it accordingly
    if (result.modifiedCount === 1) {
      return res.json({ message: 'Password reset successful' });
    } else {
      return res.status(404).json({ message: 'User not found or password not modified' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  login,
  ResetPassword,
};
