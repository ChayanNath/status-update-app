const Status = require("../models/Status");
const User = require("../models/User");
const Team = require("../models/Team");
const excelExporter = require("../utils/excelExporter");

exports.addStatus = async (title, description, userId, teamId) => {
  const user = await User.findById(userId);
  const team = await Team.findById(teamId);
  if (!user || !team) {
    throw new Error("User or team not found");
  }
  const status = new Status({ title, description, user, team });
  await status.save();
  return status;
};

exports.getStatuses = async (startDate, endDate, teamId) => {
  const query = {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  };
  if (teamId) {
    query.team = teamId;
  }
  const statuses = await Status.find(query).populate("user team");

  return statuses;
};

exports.exportStatuses = async (startDate, endDate, teamId) => {
  const statuses = await this.getStatuses(startDate, endDate, teamId);
  const buffer = await excelExporter(statuses);
  return buffer;
};
