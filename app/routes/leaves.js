const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leaves");


const multer = require("multer");

// Route: GET /leaves
router.get("/", leavesController.getAllLeaves);




// Route: POST /leaves


const storagele = multer.diskStorage({
    destination: "./app/upload/request",
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
      cb(null, Date.now() + fileName);
    },
  });

const uploadle = multer({ storage: storagele });


router.post("/request",uploadle.single("photo"), leavesController.createLeave);

router.post("/aprove", leavesController.approveLeave);

// Route: GET /leaves/:id
router.get("/:id", leavesController.getLeaveById);

// Route: GET /leaves/user/:id
router.get("/user/:id", leavesController.getLeavesByUserId);

// Route: PUT /leaves/:id
router.put("/:id", leavesController.updateLeaveById);

// Route: DELETE /leaves/:id
router.delete("/:id", leavesController.deleteLeaveById);

module.exports = router;
