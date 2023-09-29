const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./app/upload",
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const upload = multer({ storage: storage });

// Route: GET /users
router.get("/", usersController.getAllUsers);

// Route: GET /Me
router.get("/me", usersController.getMe);

// Route: POST /users
router.post("/", upload.single("photo"), usersController.createUser);

// Route: GET /users/:id
router.get("/:id", usersController.getUserById);

// Route: PUT /users/:id
router.put("/:id", usersController.updateUserById);

// Route: DELETE /users/:id
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
