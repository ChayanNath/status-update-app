const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);
router.post(
  "/refresh-token",
  passport.authenticate("jwt", { session: false }),
  authController.refreshToken
);

module.exports = router;
