const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const createAdminUser = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || "admin",
      password: hashedPassword,
      firstName: "admin",
      lastName: "user",
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
