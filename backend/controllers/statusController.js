const statusService = require("../services/statusService");

exports.addStatus = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const userId = req.user._id;

    const status = await statusService.addStatus(
      title,
      description,
      userId,
      date
    );

    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStatuses = async (req, res) => {
  try {
    let { startDate, endDate, teamId } = req.query;

    // Set default to fetch today's status after 10:30 AM
    if (!startDate && !endDate) {
      const today = new Date();
      const now = new Date();

      // Set time for today's start and end dates
      const startOfToday = new Date(today.setHours(10, 30, 0, 0)).toISOString();
      const endOfToday = now.toISOString(); // Fetch until current time

      // Fetch today's statuses first
      const statusesToday = await statusService.getStatuses(
        startOfToday,
        endOfToday,
        teamId
      );

      // If no statuses are found for today, fetch yesterday's statuses
      if (statusesToday.length === 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0); // Start of yesterday

        const startOfYesterday = yesterday.toISOString();
        const endOfYesterday = today.setHours(0, 0, 0, 0).toISOString(); // End of yesterday

        const statusesYesterday = await statusService.getStatuses(
          startOfYesterday,
          endOfYesterday,
          teamId
        );

        return res.json(statusesYesterday);
      }

      return res.json(statusesToday);
    }

    // If startDate and endDate are provided, use them
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

exports.getUserUpdates = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    // Validate query parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Set default dates if not provided
    const now = new Date();
    const endOfToday = now.toISOString();
    let startOfRange = new Date(now.setDate(now.getDate() - 30)).toISOString(); // Default to last 30 days if startDate is not provided

    if (startDate) {
      startOfRange = new Date(startDate).toISOString();
    }

    const endDateRange = endDate ? new Date(endDate).toISOString() : endOfToday;

    // Fetch user updates for the specified date range
    const userUpdates = await statusService.getUserUpdates(
      userId,
      startOfRange,
      endDateRange
    );

    res.json(userUpdates);
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

    const teamName = await statusService.getTeamName(teamId);
    const formattedTeamName = (teamName || "all-teams").replace(/\s+/g, "_");

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
    const fileName = `status-updates-${formattedTeamName}-${formattedStartDate}-to-${formattedEndDate}.xlsx`;
    const encodedFileName = encodeURIComponent(fileName);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodedFileName}`
    );
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = new Date(req.query.date);

    const response = await statusService.getStatus(userId, date);

    if (response) {
      res.status(200).json(response);
    } else {
      res
        .status(400)
        .json({ message: "No status found for the selected date" });
    }
  } catch (error) {
    console.error("Error in getStatus controller:", error);
    res.status(500).json({ message: error.message });
  }
};
