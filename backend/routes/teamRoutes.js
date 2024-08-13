const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const adminMiddleware = require("../middleware/adminMiddleware");
const superUserMiddleware = require("../middleware/superUserMiddleware");

//Check if the user is a super user.
router.post("/grantAdmin", superUserMiddleware, teamController.grantAdmin);
// Route to create a new team
router.post("/create", adminMiddleware, teamController.createTeam);

// Route to add a member to a team
router.post("/addMember", adminMiddleware, teamController.addMember);

router.delete("/:teamId", adminMiddleware, teamController.deleteTeam);

router.get("/getallteams", teamController.getTeams);

router.put("/:teamId", adminMiddleware, teamController.updateTeam);

module.exports = router;
