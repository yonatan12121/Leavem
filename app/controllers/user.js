const User = require("../models/user");
const passwordHash = require("password-hash");

// Controller: Create a user
const createUser = async (req, res) => {
  // console.log(req);
    const role="user";
  if (role === "user") {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const employmentDate = new Date(req.body.employment_date);
      const currentDate = new Date();
      const employmentDurationInMonths =
        (currentDate.getFullYear() - employmentDate.getFullYear()) * 12 +
        (currentDate.getMonth() - employmentDate.getMonth());

      const totalLeaves =
        employmentDurationInMonths >= 12
          ? 16
          : Math.floor(employmentDurationInMonths * 1.3);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        photo: "http://localhost:5000" + "/upload/" + req.file.filename,
        studied: req.body.studied,
        role: role,
        password: req.body.password ,
        department_id: req.body.department_id,
        employment_date: req.body.employment_date,
        employment_status: "active",
        total_leaves: totalLeaves,
      });

      await user
        .save()
        .then((data) => {
          console.log("new employee added");
          res.status(201).json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res
      .status(401)
      .json({ msg: "You're not authorized to perform this task." });
  }
};

//return its own data
const getMe = (req, res) => {
  const id = req.user.user_id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Get all users
const getAllUsers = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

// Controller: Get a user by ID
const getUserById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    User.findById(id)
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(user);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

// Controller: Update a user by ID
const updateUserById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;
    const updatedUserData = req.body;

    User.findByIdAndUpdate(id, updatedUserData, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(updatedUser);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

// Controller: Delete a user by ID
const deleteUserById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    User.findByIdAndRemove(id)
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.sendStatus(204);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getMe,
};
