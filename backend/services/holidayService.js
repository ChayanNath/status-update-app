const Holiday = require("../models/Holiday");
const { generateHolidayTemplate } = require("../utils/excelExporter");

exports.downloadHolidayTemplate = async () => {
  try {
    const buffer = await generateHolidayTemplate();
    return buffer;
  } catch (error) {
    throw new Error("Error generating holiday template");
  }
};

exports.getHolidays = async () => {
  try {
    const holidays = await Holiday.find({}).lean();
    return holidays;
  } catch (error) {
    throw new Error("Error fetching holidays");
  }
};

exports.processUploadedHolidayFile = async (filePath) => {
  try {
    const message = await holidayService.processUploadedHolidayFile(filePath);
    return message;
  } catch (error) {
    throw new Error("Error processing uploaded holiday file");
  }
};
