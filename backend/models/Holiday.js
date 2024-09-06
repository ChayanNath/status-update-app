const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  event: { type: String, required: true },
});

module.exports = mongoose.model("Holiday", HolidaySchema);
