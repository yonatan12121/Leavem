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
router.post("/register", upload.single("photo"), usersController.createUser);

// Route: Post/update


const storageu = multer.diskStorage({
  destination: "./app/upload",
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const uploadu = multer({ storage: storageu });

router.post("/updateUser",uploadu.single("photo"), usersController.updateUser);

router.post("/changePassword", usersController.changePassword);


router.post("/notifcation", usersController.notificationUpdate);




// Route: GET /users/:id
router.get("/:id", usersController.getUserById);

// Route: PUT /users/:id
router.put("/:id", usersController.updateUserById);

// Route: DELETE /users/:id
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
