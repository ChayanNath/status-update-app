const User = require("../models/User");

exports.getUsersWithoutTeam = async () => {
  try {
    const users = await User.find({ team: { $exists: false } });
    return users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      id: user._id,
    }));
  } catch (error) {
    throw new Error("Error fetching users without team: " + error.message);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

exports.getUsers = async (userIds) => {
  try {
    const users = await User.find({
      _id: { $in: userIds },
    }).select("firstName lastName");

    const transformedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
    return transformedUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addFine = async (userId, statusId, fine = 10) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find the status update for the user
    const status = await Status.findById(statusId);

    if (!status) {
      throw new Error("Status update not found");
    }

    // Add fine entry to the status document
    status.fine = fine;
    await status.save();

    // Update the user's total fine amount
    user.fineAmount += fine;
    await user.save();

    return { message: "Fine added successfully", fineAmount: user.fineAmount };
  } catch (error) {
    throw new Error(error.message);
  }
};
