const User = require("../models/user");

const bcrypt = require("bcryptjs");

// Controller: Create a user
const createUser = async (req, res) => {
  // console.log(req);
    const role="user";
    const { email,fullName, password,studied,department,employment_date } = req.body;
    const encreptedPassword = await bcrypt.hash(password, 10);
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email:email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const employmentDate = new Date(req.body.employment_date);
      const currentDate = new Date();
      const employmentDurationInMonths =
        (currentDate.getFullYear() - employmentDate.getFullYear()) * 12 +
        (currentDate.getMonth() - employmentDate.getMonth());

      const totalLeaves = employmentDurationInMonths >= 12 ? 16 : employmentDurationInMonths >= 24 ? 18 : Math.floor(employmentDurationInMonths * 1.3);

      const user = new User({
        name: fullName,
        email: email,
        photo: "http://localhost:5000" + "/upload/" + req.file.filename,
        studied: studied,
        role: role,
        password: encreptedPassword ,
        department_id: department,
        employment_date: employment_date,
        employment_status: "active",
        total_leaves:totalLeaves,
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
  
};




const updateUser = async (req, res) => {
  // Update user details by ID
  
    // const userId = req.params.id; // Get the user ID from the request params

    try {
      const { email, department, studied, userId } = req.body; // Get updated fields from request body

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const multer = require("multer");

      const storage = multer.diskStorage({
        destination: "./app/upload",
        filename: function (req, file, cb) {
          const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
          cb(null, Date.now() + fileName);
        },
      });
      
      const upload = multer({ storage: storage });

      upload.single("photo")
      

      // Update user fields if provided
      if (email) {
        user.email = email;
      }
      if (department) {
        user.department_id = department;
      }
      if (studied) {
        user.studied = studied;
      }
      if (profilePicture) {
        user.photo = "http://localhost:5000" + "/upload/" + req.file.filename;
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }





// return its own data
const getMe = (req, res) => {
  const email = req.user.email;
  User.findOne(id)
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
 
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error",error });
      });


  
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
  updateUser
};
