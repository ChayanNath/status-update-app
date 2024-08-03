const Status = require("../models/Status");
const User = require("../models/User");
const Team = require("../models/Team");
const excelExporter = require("../utils/excelExporter");

exports.addStatus = async (title, description, userId, teamId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let team = null;
  if (teamId) {
    team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
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

  // Select only the necessary fields from Status and populate user and team fields
  const statuses = await Status.find(query)
    .select("title description date user team") // Adjust the fields here
    .populate({
      path: "user",
      select: "firstName lastName", // Select only required fields from user
    });

  return statuses;
};

exports.exportStatuses = async (startDate, endDate, teamId) => {
  const statuses = await this.getStatuses(startDate, endDate, teamId);
  const buffer = await excelExporter(statuses);
  return buffer;
};

exports.getUserUpdates = async (userId, startDate, endDate) => {
  try {
    const query = {
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    const userUpdates = await Status.find(query)
      .select("title description date")
      .populate({
        path: "user",
        select: "firstName lastName",
      });

    return userUpdates;
  } catch (error) {
    console.error("Error fetching user updates:", error);
    throw new Error("Error fetching user updates");
  }
};
