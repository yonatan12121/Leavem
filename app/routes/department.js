const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departments");

// Route: GET /departments
router.get("/", departmentsController.getAllDepartments);

// Route: POST /departments
router.post("/", departmentsController.createDepartment);

// Route: GET /departments/:id
router.get("/:id", departmentsController.getDepartmentById);

// Route: PUT /departments/:id
router.put("/:id", departmentsController.updateDepartmentById);

// Route: DELETE /departments/:id
router.delete("/:id", departmentsController.deleteDepartmentById);

module.exports = router;
