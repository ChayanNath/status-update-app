const express = require("express");
const router = express.Router();
const holidayController = require("../controllers/holidayController");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get(
  "/download-holiday-template",
  adminMiddleware,
  holidayController.downloadHolidayTemplate
);

router.get("/get-holidays", adminMiddleware, holidayController.getHolidays);

router.post(
  "/upload-holidays",
  adminMiddleware,
  upload.single("file"),
  holidayController.uploadHoliday
);

module.exports = router;
