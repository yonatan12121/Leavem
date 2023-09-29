// routes/leaveTypes.js

const express = require("express");
const router = express.Router();
const leaveTypesController = require("../controllers/leaveTypes");

// Route: GET /leaveTypes
router.get("/", leaveTypesController.getAllLeaveTypes);

// Route: POST /leaveTypes
router.post("/", leaveTypesController.createLeaveType);

// Route: GET /leaveTypes/:id
router.get("/:id", leaveTypesController.getLeaveTypeById);

// Route: PUT /leaveTypes/:id
router.put("/:id", leaveTypesController.updateLeaveTypeById);

// Route: DELETE /leaveTypes/:id
router.delete("/:id", leaveTypesController.deleteLeaveTypeById);

module.exports = router;
