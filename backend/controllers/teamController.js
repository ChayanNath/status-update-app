const teamService = require("../services/teamService");

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = await teamService.createTeam(name);
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await teamService.addMember(teamId, userId);
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};