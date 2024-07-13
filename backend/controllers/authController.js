const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};