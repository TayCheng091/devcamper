const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

// Without controller
// router.get("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "Show all bootcamps" });
// });

// router.get("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
// });

// router.post("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "Create all bootcamps" });
// });

// router.put("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
// });

// router.delete("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
// });

module.exports = router;
