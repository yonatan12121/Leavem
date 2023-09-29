const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leaves");

// Route: GET /leaves
router.get("/", leavesController.getAllLeaves);

// Route: POST /leaves
router.post("/", leavesController.createLeave);

// Route: GET /leaves/:id
router.get("/:id", leavesController.getLeaveById);

// Route: GET /leaves/user/:id
router.get("/user/:id", leavesController.getLeavesByUserId);

// Route: PUT /leaves/:id
router.put("/:id", leavesController.updateLeaveById);

// Route: DELETE /leaves/:id
router.delete("/:id", leavesController.deleteLeaveById);

module.exports = router;
