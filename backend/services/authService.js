const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Load environment variables
const secret = process.env.SECRET_KEY;

exports.register = async (firstName, lastName, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin || false,
    team: user.team || null,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return { payload, token };
};
