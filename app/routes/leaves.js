const express = require("express");
const router = express.Router();
const leavesController = require("../controllers/leaves");


const multer = require("multer");

/**
 * @openapi
 * /leave:
 *   get:
 *     tags:
 *     - leaves
 *     summary: Get all leaves
 *     responses:
 *       200:
 *         description: Returns a list of all leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get("/", leavesController.getAllLeaves);

router.post("/update", leavesController.updateLeave);



// Route: POST /leaves
/**
 * @openapi
 * /leave/request:
 *   post:
 *     tags:
 *     - leaves
 *     summary: Create a leave request
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               Id:
 *                 type: string
 *               duration:
 *                 type: number
 *               leave_type:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *             required:
 *               - _id
 *               - Id
 *               - duration
 *               - leave_type
 *               - start_date
 *               - end_date
 *               - reason
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *         content:
 *           application/json:
 *           
 *       400:
 *         description: Bad request or insufficient leave balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       409:
 *         description: User already has a pending leave
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

const storagele = multer.diskStorage({
    destination: "./app/upload/request",
    filename: function (req, file, cb) {
      const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
      cb(null, Date.now() + fileName);
    },
  });

const uploadle = multer({ storage: storagele });


router.post("/request",uploadle.single("photo"), leavesController.createLeave);

router.post("/approve", leavesController.approveLeave);

router.post("/decline", leavesController.declineLeave);

router.get("/approvedmonth", leavesController.getLeaveSummaryForMonth);

// router.get("/leaveSummery", leavesController.getLeaveSummaryForMonth);





// Route: GET /leaves/:id
router.get("/:id", leavesController.getLeaveById);

// Route: GET /leaves/user/:id
router.get("/user/:id", leavesController.getLeavesByUserId);

// Route: PUT /leaves/:id
router.put("/:id", leavesController.updateLeaveById);

// Route: DELETE /leaves/:id
router.delete("/:id", leavesController.deleteLeaveById);

module.exports = router;
