const User = require("../models/User");

exports.getUsersWithoutTeam = async () => {
  try {
    const users = await User.find({ team: { $exists: false } });
    return users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));
  } catch (error) {
    throw new Error("Error fetching users without team: " + error.message);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
