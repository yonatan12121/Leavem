const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Route: POST login user
router.post("/", authController.login);
router.post("/reset", authController.ResetPassword);


module.exports = router;
