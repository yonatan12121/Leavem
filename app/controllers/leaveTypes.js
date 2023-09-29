const LeaveType = require("../models/leaveType");

// Controller: Get all leave types
const getAllLeaveTypes = (req, res) => {
  LeaveType.find()
    .then((leaveTypes) => {
      res.json(leaveTypes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Create a leave type
const createLeaveType = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { name, description } = req.body;

    const leaveType = new LeaveType({
      name,
      description,
    });

    leaveType
      .save()
      .then((savedLeaveType) => {
        res.status(201).json(savedLeaveType);
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

// Controller: Get a leave type by ID
const getLeaveTypeById = (req, res) => {
  const { id } = req.params;

  LeaveType.findById(id)
    .then((leaveType) => {
      if (!leaveType) {
        res.status(404).json({ error: "Leave type not found" });
      } else {
        res.json(leaveType);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Update a leave type by ID
const updateLeaveTypeById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;
    const updatedLeaveTypeData = req.body;

    LeaveType.findByIdAndUpdate(id, updatedLeaveTypeData, { new: true })
      .then((updatedLeaveType) => {
        if (!updatedLeaveType) {
          res.status(404).json({ error: "Leave type not found" });
        } else {
          res.json(updatedLeaveType);
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

// Controller: Delete a leave type by ID
const deleteLeaveTypeById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    LeaveType.findByIdAndRemove(id)
      .then((deletedLeaveType) => {
        if (!deletedLeaveType) {
          res.status(404).json({ error: "Leave type not found" });
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
  getAllLeaveTypes,
  createLeaveType,
  getLeaveTypeById,
  updateLeaveTypeById,
  deleteLeaveTypeById,
};
