const Team = require("../models/Team");
const User = require("../models/User");
const ExcelJS = require("exceljs");
const Holiday = require("../models/Holiday");
const mongoose = require("mongoose");

exports.createTeam = async (name, teamMembers, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const team = new Team({ name, description });
    await team.save({ session });

    if (teamMembers && teamMembers.length > 0) {
      await User.updateMany(
        { _id: { $in: teamMembers } },
        { $set: { team: team._id } },
        { session }
      );

      team.members = teamMembers;
      await team.save({ session });
    }

    const populatedTeam = await Team.findById(team._id)
      .populate("members", "firstName lastName")
      .session(session)
      .select("name members description");

    await session.commitTransaction();
    session.endSession();

    return populatedTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.updateTeam = async (teamId, name, description, teamMembers) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const team = await Team.findById(teamId).session(session);
    if (!team) {
      throw new Error("Team not found");
    }

    // Ensure we update all fields
    team.name = name || team.name;
    team.description = description || team.description;

    if (teamMembers && Array.isArray(teamMembers)) {
      await User.updateMany(
        { team: team._id },
        { $unset: { team: "" } },
        { session }
      );

      await User.updateMany(
        { _id: { $in: teamMembers } },
        { $set: { team: team._id } },
        { session }
      );

      team.members = teamMembers;
    }

    await team.save({ session });

    const populatedTeam = await Team.findById(team._id)
      .populate("members", "firstName lastName")
      .session(session);

    await session.commitTransaction();
    session.endSession();

    return populatedTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.deleteTeam = async (teamId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Find the team
    const team = await Team.findById(teamId).session(session);
    if (!team) {
      throw new Error("Team not found");
    }

    await User.updateMany(
      { team: teamId },
      { $unset: { team: "" } },
      { session }
    );

    await Team.findByIdAndDelete(teamId).session(session);

    await session.commitTransaction();
    session.endSession();

    return { message: "Team and references removed successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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

  team.members.push(user._id);
  await team.save();

  user.team = team._id;
  await user.save();

  return team;
};

// Function for granting admin privileges
exports.grantAdmin = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is not available");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    user.isAdmin = true;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

exports.getTeams = async () => {
  try {
    const teams = await Team.find().populate("members", "firstName lastName");

    // Format the members for each team
    const teamsWithFormattedMembers = teams.map((team) => ({
      ...team._doc,
      members: team.members.map((member) => ({
        id: member._id,
        name: `${member.firstName} ${member.lastName}`,
      })),
    }));

    return teamsWithFormattedMembers;
  } catch (error) {
    throw error;
  }
};

exports.uploadHoliday = async (file) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file.path);

    const worksheet = workbook.worksheets[0];

    const holidays = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const date = row.getCell(1).value;
        const name = row.getCell(2).value;

        holidays.push({ date: new Date(date), name });
      }
    });

    for (const holiday of holidays) {
      await Holiday.updateOne(
        { date: holiday.date },
        { date: holiday.date, name: holiday.name },
        { upsert: true }
      );
    }
  } catch (error) {
    throw error;
  }
};
