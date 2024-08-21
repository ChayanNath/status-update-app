const Team = require("../models/Team");
const User = require("../models/User");
const ExcelJS = require("exceljs");
const Holiday = require("../models/Holiday");
const mongoose = require("mongoose");

exports.createTeam = async (name, teamMembers, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Create the team
    const team = new Team({ name, description });
    await team.save({ session });

    if (teamMembers && teamMembers.length > 0) {
      // Update team members
      await User.updateMany(
        { _id: { $in: teamMembers } },
        { $set: { team: team._id } },
        { session }
      );

      // Add members to team
      team.members = teamMembers;
      await team.save({ session });
    }

    // Query the team again to populate it
    const populatedTeam = await Team.findById(team._id)
      .populate("members", "firstName lastName") // Populate firstName and lastName of User
      .session(session)
      .select("name members description"); // Select only the name and members fields

    await session.commitTransaction();
    session.endSession();

    return populatedTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.updateTeam = async (teamId, name, teamMembers, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const team = await Team.findById(teamId).session(session);
    if (!team) {
      throw new Error("Team not found");
    }

    if (name) {
      team.name = name;
    }

    if (description) {
      team.description = description;
    }

    if (teamMembers && teamMembers.length > 0) {
      // Remove current team members
      await User.updateMany(
        { team: team._id },
        { $unset: { team: "" } },
        { session }
      );

      // Add new team members
      await User.updateMany(
        { _id: { $in: teamMembers } },
        { $set: { team: team._id } },
        { session }
      );

      // Update the team's members field
      team.members = teamMembers;
    }

    await team.save({ session });

    const populatedTeam = await Team.findById(team._id)
      .populate("members", "firstName lastName") // Populate firstName and lastName of User
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

    // Remove the team reference from users
    await User.updateMany(
      { team: teamId },
      { $unset: { team: "" } },
      { session }
    );

    // Delete the team
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

  // Add user ID to team members
  team.members.push(user._id);
  await team.save();

  // Update user's team reference
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
