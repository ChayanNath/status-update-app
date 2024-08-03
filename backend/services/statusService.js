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

const getDayOfWeek = (date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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

    const userUpdatesWithDay = userUpdates.map((update) => {
      const date = new Date(update.date);
      return {
        ...update.toObject(),
        date: formatDate(date),
        day: getDayOfWeek(date),
      };
    });

    return userUpdatesWithDay;
  } catch (error) {
    console.error("Error fetching user updates:", error);
    throw new Error("Error fetching user updates");
  }
};
