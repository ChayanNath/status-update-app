const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

// Route to add a new status
router.post("/add", statusController.addStatus);

// Route to get statuses by date range and optionally by team
router.get("/get", statusController.getStatuses);

// Route to export statuses to an Excel file
router.get("/export", statusController.exportStatuses);

module.exports = router;
