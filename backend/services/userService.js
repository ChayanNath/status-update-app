const User = require("../models/User");

exports.getUsersWithoutTeam = async () => {
  try {
    const users = await User.find({ team: { $exists: false } });
    return users;
  } catch (error) {
    throw new Error("Error fetching users without team: " + error.message);
  }
};
