const express = require("express");
const multer = require("multer");
const router = express.Router();
const teamController = require("../controllers/teamController");
const adminMiddleware = require("../middleware/adminMiddleware");
const superUserMiddleware = require("../middleware/superUserMiddleware");

const upload = multer({ dest: "uploads/" });

router.post("/grantAdmin", superUserMiddleware, teamController.grantAdmin);

router.post("/create", adminMiddleware, teamController.createTeam);

router.post("/addMember", adminMiddleware, teamController.addMember);

router.delete("/:teamId", adminMiddleware, teamController.deleteTeam);

router.get("/getallteams", teamController.getTeams);

router.put("/:teamId", adminMiddleware, teamController.updateTeam);

router.post(
  "/upload-holidays",
  adminMiddleware,
  upload.single("file"),
  teamController.uploadHoliday
);

module.exports = router;
