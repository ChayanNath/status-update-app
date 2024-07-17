const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", allowNull: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Status", StatusSchema);
