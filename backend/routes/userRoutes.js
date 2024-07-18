const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/without-team", userController.getUsersWithoutTeam);

module.exports = router;
