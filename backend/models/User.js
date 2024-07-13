const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  isAdmin: { type: Boolean, default: false },
  isSuperUser: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
