const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Route: POST login user
router.post("/", authController.login);

module.exports = router;
