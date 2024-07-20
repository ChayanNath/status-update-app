const userService = require("../services/userService");

exports.getUsersWithoutTeam = async (req, res) => {
  try {
    const users = await userService.getUsersWithoutTeam();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
