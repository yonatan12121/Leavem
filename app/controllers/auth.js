const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const bcrypt = require("bcryptjs");

// Controller: User login
const login = async (req, res) => {
  const { email, password } = req.body;
console.log(email, password);
console.log("hellooo");
  //find the user by email
  const user = await User.findOne({ email });
  console.log(user);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    //compare the provided password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          data:user
        },
        process.env.JWT_SECRET,
        { expiresIn: "9h" }
      );

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
