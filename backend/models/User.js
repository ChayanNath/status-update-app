const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  isAdmin: { type: Boolean, default: false },
  isSuperUser: { type: Boolean, default: false },
  fineAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
