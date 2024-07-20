const Team = require("../models/Team");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createTeam = async (name, teamMembers) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Create the team
    const team = new Team({ name });
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
      .populate("members", "_id") // Only populate the _id field
      .session(session)
      .select("name members"); // Select only the name and members fields

    await session.commitTransaction();
    session.endSession();

    return populatedTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.updateTeam = async (teamId, name, teamMembers) => {
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

    if (teamMembers && teamMembers.length > 0) {
      // Remove current team members
      await User.updateMany(
        { team: team._id },
        { $unset: { team: 1 } },
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
      .populate("members", "_id") // Only populate _id field
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
