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
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    // Create payload and tokens
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

    // Update the user's refresh token and save
    user.refreshToken = refreshToken;
    await user.save(); // Make sure to await the save operation

    // Return the payload and tokens
    return { payload, token, refreshToken };
  } catch (error) {
    // Handle errors
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
