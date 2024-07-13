const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Load environment variables
const secret = process.env.SECRET_KEY;

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
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
  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return { user, token };
};
