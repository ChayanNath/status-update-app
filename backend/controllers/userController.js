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

exports.addFine = async (req, res) => {
  try {
    const { statusId, fine } = req.body;
    const userId = req.user._id;

    if (!userId || !statusId) {
      return res
        .status(400)
        .json({ message: "User ID and Status ID are required" });
    }

    const response = await userService.addFine(userId, statusId, fine);

    res.json({
      message: "Fine added successfully",
      fineAmount: response.fineAmount,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { users } = req.body;
    if (!users && !users.length) {
      return res.status(400).json("No user id provided");
    }
    const result = await userService.getUsers(users);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }

    const result = await userService.makeAdmin(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }
    const result = await userService.removeUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
