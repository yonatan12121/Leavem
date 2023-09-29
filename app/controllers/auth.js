const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");

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
    if (password === user.password) {
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
      return res.status(200).json({ msg: "wrong password" });
    }
 
};

module.exports = {
  login,
};
