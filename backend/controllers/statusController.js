const statusService = require("../services/statusService");

exports.addStatus = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request
    const status = await statusService.addStatus(
      title,
      description,
      userId,
      teamId
    );
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStatuses = async (req, res) => {
  try {
    let { startDate, endDate, teamId } = req.query;

    // If startDate and endDate are not provided, default to fetching last day's status
    if (!startDate && !endDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate());
      yesterday.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

      const today = new Date();
      today.setHours(10, 30, 0, 0); // Set time to 10:30:00.000

      startDate = yesterday.toISOString();
      endDate = today.toISOString();

      console.log(`startDate: ${startDate}, endDate: ${endDate}`);
    }

    const statuses = await statusService.getStatuses(
      startDate,
      endDate,
      teamId
    );
    res.json(statuses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.exportStatuses = async (req, res) => {
  try {
    const { startDate, endDate, teamId } = req.query;
    const buffer = await statusService.exportStatuses(
      startDate,
      endDate,
      teamId
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=status-updates.xlsx"
    );
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
