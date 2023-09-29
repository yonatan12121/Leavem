const Department = require("../models/departments");

// Controller: Get all departments
const getAllDepartments = (req, res) => {
  Department.find()
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Create a department
const createDepartment = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    // Extract department data from the request body
    const { name, description } = req.body;

    // Check if both name and description are provided
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    // Create a new department object
    const department = new Department({
      name,
      description,
    });

    // Save the department to the database
    department
      .save()
      .then((savedDepartment) => {
        res.status(201).json(savedDepartment);
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

// Controller: Get a department by ID
const getDepartmentById = (req, res) => {
  const { id } = req.params;

  Department.findById(id)
    .then((department) => {
      if (!department) {
        res.status(404).json({ error: "Department not found" });
      } else {
        res.json(department);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Update a department by ID
const updateDepartmentById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;
    const updatedDepartmentData = req.body;

    Department.findByIdAndUpdate(id, updatedDepartmentData, { new: true })
      .then((updatedDepartment) => {
        if (!updatedDepartment) {
          res.status(404).json({ error: "Department not found" });
        } else {
          res.json(updatedDepartment);
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

// Controller: Delete a department by ID
const deleteDepartmentById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    Department.findByIdAndRemove(id)
      .then((deletedDepartment) => {
        if (!deletedDepartment) {
          res.status(404).json({ error: "Department not found" });
        } else {
          res.status(204).json({ msg: "succesfully deleted" });
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
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
