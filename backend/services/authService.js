const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.SECRET_KEY;

exports.register = async (firstName, lastName, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  username = username.toLowerCase();
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
  try {
    username = username.toLowerCase();
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
    const refreshToken = jwt.sign({ id: user._id }, secret, {
      expiresIn: "24h",
    });

    user.refreshToken = refreshToken;
    await user.save();

    return { payload, token, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.refreshToken = async (oldRefreshToken) => {
  try {
    const payload = jwt.verify(oldRefreshToken, secret);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error("Invalid refresh token");
    }

    const newToken = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1h" }
    );
    const newRefreshToken = jwt.sign({ id: user._id }, secret, {
      expiresIn: "24h",
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    return { newToken, newRefreshToken };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

exports.logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.refreshToken = null;
  await user.save();
};

exports.makeAdmin = async (userId) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
