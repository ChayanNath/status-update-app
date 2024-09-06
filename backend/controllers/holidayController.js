const holidayService = require("../services/holidayService");

exports.downloadHolidayTemplate = async (req, res) => {
  try {
    const buffer = await holidayService.downloadHolidayTemplate();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=holiday-template.xlsx"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error downloading holiday template:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getHolidays = async (req, res) => {
  try {
    const holidays = await holidayService.getHolidays();
    res.json(holidays);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.uploadHoliday = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const message = await holidayService.processUploadedHolidayFile(file.path);
    res.status(200).send(message);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
};
