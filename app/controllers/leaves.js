const Leave = require("../models/leave");
const User = require("../models/user");

// Controller: Get all leaves with pagination
// const getAllLeaves = async (req, res) => {
//   try {
//     if (req.user.role === "hr" || req.user.role === "admin") {
//       const { page, limit } = req.query;
//       const pageNumber = parseInt(page) || 1;
//       const pageSize = parseInt(limit) || 10;

//       const totalLeaves = await Leave.countDocuments();
//       const totalPages = Math.ceil(totalLeaves / pageSize);

//       /*
//       const leaves = await Leave.find()
//         .sort({ createdAt: -1 })
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize);
//         */
//       const leaves = await Leave.aggregate([
//         {
//           $sort: { createdAt: -1 },
//         },
//         {
//           $skip: (pageNumber - 1) * pageSize,
//         },
//         {
//           $limit: pageSize,
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "user_id",
//             foreignField: "_id",
//             as: "user",
//           },
//         },
//         {
//           $unwind: "$user",
//         },
//         {
//           $lookup: {
//             from: "leavetypes",
//             localField: "leave_type_id",
//             foreignField: "_id",
//             as: "leave_type",
//           },
//         },
//         {
//           $unwind: "$leave_type",
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "approver_id",
//             foreignField: "_id",
//             as: "approver",
//           },
//         },
//         {
//           $unwind: {
//             path: "$approver",
//             preserveNullAndEmptyArrays: true,
//           },
//         },
//         {
//           $project: {
//             _id: 1,
//             start_date: 1,
//             end_date: 1,
//             reason: 1,
//             status: 1,
//             createdAt: 1,
//             remarks: 1,
//             leave_type_id: 1,
//             approveBy: 1,
//             "user._id": 1,
//             "user.name": 1,
//             "user.email": 1,
//             "leave_type.name": 1,
//             "leave_type.description": 1,
//             "approver._id": 1,
//             "approver.name": 1,
//             "approver.email": 1,
//           },
//         },
//       ]);

//       res.json(leaves);
//       /**
//        *  currentPage: pageNumber,
//         totalPages,
//         totalLeaves,
//        */
//     } else {
//       res
//         .status(401)
//         .json({ msg: "You're not authorized to perform this task" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
//
const getAllLeaves = (req, res) => {
  Leave.find()
    .then((leaves) => {
      res.json(leaves);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error", error });
    });
};

// Controller: Create a leave
// const createLeave = async (req, res) => {
//   const { _id, Id, duration, leave_type, start_date, end_date, reason } =
//     req.body;
//   console.log(Id, duration, leave_type, start_date, end_date, reason);

//   try {
//     // Get the user from user_id
//     console.log(_id);
//     const user = await User.findById(_id);
//     console.log("heheheh", user);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if user already has a pending leave
//     const hasPendingLeave = await Leave.exists({
//       Id,
//       status: "pending",
//     });

//     if (hasPendingLeave) {
//       return res
//         .status(400)
//         .json({ error: "You already have a pending leave" });
//     }

//     // Calculate the duration of the leave in days
//     let leaveDuration = 0; // Change to let to allow reassignment
//     const startDate = new Date(start_date);
//     const endDate = new Date(end_date);
//     const oneDay = 24 * 60 * 60 * 1000;

//     if (startDate.getTime() === endDate.getTime() && duration === "0.5") {
//       leaveDuration = 0.5;
//     } else {
//       leaveDuration = Math.round(Math.abs(endDate - startDate) / oneDay) + 1;
//     }
//     // Check if user has enough leave balance
//     if (user.total_leaves < leaveDuration) {
//       return res.status(400).json({ error: "Insufficient leave balance" });
//     }
//     console.log(req.photo);
//     const leave = new Leave({
//       Id: Id,
//       photo: "http://localhost:5000" + "/upload/request/" + req.file.filename,
//       duration: leaveDuration,
//       leave_type: leave_type,
//       start_date: start_date,
//       end_date: end_date,
//       reason: reason,
//       status: "pending", // Set the default status as 'pending'
//     });
//     console.log(leave);
//     const savedLeave = await leave.save();
//     // Decrement the leave balance of the user
//     res.status(201).json(savedLeave);
//   } catch (error) {
//     // Log the error message to the console for debugging
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const createLeave = async (req, res) => {
  const { _id, Id, duration, leave_type, start_date, end_date, reason } =
    req.body;
  console.log(Id, duration, leave_type, start_date, end_date, reason);

  try {
    // Get the user from user_id
    console.log(_id);
    const user = await User.findById(_id);
    console.log("heheheh", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user already has a pending leave
    const hasPendingLeave = await Leave.exists({
      Id,
      status: "pending",
    });

    if (hasPendingLeave) {
      return res
        .status(400)
        .json({ error: "You already have a pending leave" });
    }

    // Calculate the duration of the leave in days
    let leaveDuration = 0;
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const oneDay = 24 * 60 * 60 * 1000;

    // Loop through the days and check for Sundays to reduce leave duration
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, ...
      if (dayOfWeek !== 0) {
        // If it's not Sunday, increment the leave duration
        leaveDuration++;
      }
    }

    // Check if user has enough leave balance
    if (user.total_leaves < leaveDuration) {
      return res.status(400).json({ error: "Insufficient leave balance" });
    }

    console.log(req.photo);
    const leave = new Leave({
      Id: Id,
      photo: "http://localhost:5000" + "/upload/request/" + req.file.filename,
      duration: leaveDuration,
      leave_type: leave_type,
      start_date: start_date,
      end_date: end_date,
      reason: reason,
      status: "pending", // Set the default status as 'pending'
    });
    console.log(leave);
    const savedLeave = await leave.save();
    
    // Decrement the leave balance of the user
    res.status(201).json(savedLeave);
  } catch (error) {
    // Log the error message to the console for debugging
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Assuming you have a Leave model and a User model imported.

// Controller function to approve a leave request
const approveLeave = async (req, res) => {
  const { data } = req.body;
  const { leaveId, Id, allowedLeaveDays,leave_type } = data;
  console.log(leaveId, Id, allowedLeaveDays);
  try {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    // Fetch the user's total_leaves by email
    const user = await User.findOne({ Id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // You can add logic here to check if the user has permission to approve leave requests

    // Update the status of the leave request to "approved"
    leave.status = "approved";
    await leave.save();
    if(leave_type!=="Unpaid Leave"){
    // Decrement the allowed leave days from user's total_leaves
    user.total_leaves -= allowedLeaveDays;
    await user.save();
    }
    // Create a notification entry for the user
    const notification = {
      text: "Your leave request has been approved.",
      name: "Leave Request",
      type: "approved",
    };

    user.Notification.push(notification);
    await user.save();

    res.status(200).json({ message: "Leave request approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to decline a leave request
// Controller function to decline a leave request
const declineLeave = async (req, res) => {
  // const leaveId = req.params.id; // Get the leave request ID from the URL parameter
  const { data } = req.body;
  const { leaveId, Id } = data;

  try {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    // You can add logic here to check if the user has permission to decline leave requests

    // Update the status of the leave request to "declined"
    leave.status = "declined";
    await leave.save();

    // Fetch the user's email from the leave request

    // Fetch the user by email
    const user = await User.findOne({ Id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a notification entry for the user
    const notification = {
      text: "Your leave request has been declined.",
      name: "Leave Request",
      type: "declined",
    };

    user.Notification.push(notification);
    await user.save();

    res.status(200).json({ message: "Leave request declined successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: Get a leave by ID
const getLeaveById = (req, res) => {
  const { id } = req.params;

  Leave.findById(id)
    .then((leave) => {
      if (!leave) {
        res.status(404).json({ error: "Leave not found" });
      } else {
        res.json(leave);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Update a leave by ID
const updateLeaveById = async (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;
    const updatedLeaveData = req.body;

    console.log("updated leave =====>", updatedLeaveData);

    try {
      const leave = await Leave.findById(id);

      if (!leave) {
        return res.status(404).json({ error: "Leave not found" });
      }

      const previousStatus = leave.status;
      leave.set(updatedLeaveData);

      // Check if the leave is being rejected and revert leave balance if it was approved previously
      if (leave.status === "denied" && previousStatus === "pending") {
        const user = await User.findById(leave.user_id);
        if (user) {
          // Calculate the duration of the leave in days
          const startDate = new Date(leave.start_date);
          const endDate = new Date(leave.end_date);
          const oneDay = 24 * 60 * 60 * 1000;
          const leaveDuration =
            Math.round(Math.abs(endDate - startDate) / oneDay) + 1;
          user.total_leaves += leaveDuration;
          await user.save();
        }
      }

      const updatedLeave = await leave.save();
      res.json(updatedLeave);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ msg: "You're not authorized to perform this task" });
  }
};

// Controller: Delete a leave by ID
const deleteLeaveById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    Leave.findByIdAndRemove(id)
      .then((deletedLeave) => {
        if (!deletedLeave) {
          res.status(404).json({ error: "Leave not found" });
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

// Controller: Get all leaves of a specific user using user_id
const getLeavesByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const leaves = await Leave.find({ user_id: id });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}; // Replace with the actual path to your model
const getApprovedLeavesForCurrentMonth = async (req, res) => {
  console.log("hello");
  try {
    // Get the current date
    const currentDate = new Date();

    // Extract the current month and year
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1

    // Create a date range for the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    console.log(firstDayOfMonth, lastDayOfMonth);
    // Query the database for leaves with the same month and status "approved"
    const approvedLeaves = await Leave.find({
      status: { $ne: 'pending' },
      created_at: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    });
    console.log(approveLeave);
    res.status(200).json({ approvedLeaves });
    return approvedLeaves;
  } catch (error) {
    console.error(
      "Error fetching approved leaves for the current month:",
      error
    );
    throw error;
  }
};

const getLeaveSummaryForMonth = async (req, res) => {
  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based months (0 for January)
    const currentYear = currentDate.getFullYear();

    // Find all approved and declined leave requests for the current month and year
    const leaveRequests = await Leave.find({
      status: { $in: ['approved', 'declined'] },
      $expr: {
        $and: [
          { $eq: [{ $year: '$start_date' }, currentYear] },
          { $eq: [{ $month: '$start_date' }, currentMonth] },
        ],
      },
    });

    // Create an array to store user statistics with name and department
    const userStatsArray = [];

    // Iterate through leave requests to collect user statistics
    for (const request of leaveRequests) {
      const userId = request.Id.toString();
      const userName = request.userName; // Assuming you have a field for user name in the Leave model
      const userDepartment = request.userDepartment; // Assuming you have a field for department in the Leave model

      // Find the user's statistics object in the userStatsArray, or create one if not found
      let userStats = userStatsArray.find((stats) => stats.userId === userId);

      if (!userStats) {
        userStats = {
          userId,
          name: userName,
          department: userDepartment,
          requested: 0,
          approved: 0,
          declined: 0,
        };
        userStatsArray.push(userStats);
      }

      // Increment the requested count
      userStats.requested++;

      // Increment the approved or declined count based on the request status
      if (request.status === 'approved') {
        userStats.approved++;
      } else if (request.status === 'declined') {
        userStats.declined++;
      }
    }

    res.status(200).json(userStatsArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  getAllLeaves,
  createLeave,
  getLeaveById,
  updateLeaveById,
  deleteLeaveById,
  getLeavesByUserId,
  approveLeave,
  declineLeave,
  getApprovedLeavesForCurrentMonth,
  getLeaveSummaryForMonth
};
