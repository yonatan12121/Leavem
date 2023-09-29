const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");

// Controller: User login
const login = (req, res) => {
  const { email, password } = req.body;
console.log(email, password);
  //find the user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    //compare the provided password
    if (password === user.password) {
      const token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "9h" }
      );

      return res.status(200).json({ token: token });
    } else {
      console.log("wrong password");
      return res.status(200).json({ msg: "wrong password" });
    }
  });
};

module.exports = {
  login,
};
