const Team = require("../models/Team");
const User = require("../models/User");

exports.createTeam = async (name) => {
  const team = new Team({ name });
  await team.save();
  return team;
};

exports.addMember = async (teamId, userId) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  team.members.push(user);
  await team.save();
  user.team = team;
  await user.save();
  return team;
};

// function for granting admin privileges
exports.grantAdmin = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User id is not available");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    user.isAdmin = true;
    await user.save();

    return user;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTeams = async () => {
  try {
    const teams = await Team.find();
    return teams;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
