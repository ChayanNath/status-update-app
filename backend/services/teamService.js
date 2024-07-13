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