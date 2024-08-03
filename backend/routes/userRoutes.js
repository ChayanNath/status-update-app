const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/without-team", userController.getUsersWithoutTeam);

router.get("/all", userController.getAllUsers);

router.post("/add-fine", userController.addFine);

router.post("/users-with-ids", userController.getUsers);

module.exports = router;
