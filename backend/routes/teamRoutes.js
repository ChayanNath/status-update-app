const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Route to create a new team
router.post("/create", adminMiddleware, teamController.createTeam);

// Route to add a member to a team
router.post("/addMember", adminMiddleware, teamController.addMember);

module.exports = router;
