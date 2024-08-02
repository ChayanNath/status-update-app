const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/refresh-token", authController.refreshToken);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);

module.exports = router;
