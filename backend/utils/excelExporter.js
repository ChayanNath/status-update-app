const ExcelJS = require("exceljs");
const Holiday = require("../models/Holiday");
const fs = require("fs");

const excelExporter = async (statuses, startDate, endDate) => {
  const workbook = new ExcelJS.Workbook();
  const statusesByUser = statuses.reduce((acc, status) => {
    const fullName = `${status.user.firstName} ${status.user.lastName}`;
    if (!acc[fullName]) {
      acc[fullName] = [];
    }
    acc[fullName].push(status);
    return acc;
  }, {});

  let currentDate = new Date(startDate);
  const localEndDate = new Date(endDate);

  currentDate = new Date(currentDate.setHours(0, 0, 0, 0));
  localEndDate.setHours(23, 59, 59, 999);

  const allDates = [];

  while (currentDate <= localEndDate) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const holidays = await Holiday.find({
    date: { $gte: startDate, $lte: endDate },
  }).lean();

  const holidayMap = holidays.reduce((acc, holiday) => {
    acc[holiday.date.toISOString().split("T")[0]] = holiday;
    return acc;
  }, {});

  Object.keys(statusesByUser).forEach((username) => {
    const sheet = workbook.addWorksheet(username);
    sheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
    ];

    const statusByDate = statusesByUser[username].reduce((acc, status) => {
      const dateKey = status.date.toISOString().split("T")[0];
      acc[dateKey] = status;
      return acc;
    }, {});

    allDates.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const status = statusByDate[dateKey] || { title: "", description: "" };

      const row = sheet.addRow({
        date: date.toLocaleDateString(),
        title: status.title,
        description: status.description.replace(/\n/g, "\r\n"),
      });

      row.getCell("description").alignment = { wrapText: true };

      const dayOfWeek = date.getDay();

      if (holidayMap[dateKey]) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ADD8E6" },
          };
        });
      } else if (dayOfWeek === 6 || dayOfWeek === 0) {
        // Mark weekends in grey
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D3D3D3" },
          };
        });
      }
    });
  });

  return workbook.xlsx.writeBuffer();
};

const generateHolidayTemplate = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Holidays");

  worksheet.columns = [
    { header: "Date (YYYY-MM-DD)", key: "date", width: 20 },
    { header: "Event", key: "event", width: 30 },
  ];

  worksheet.addRow(["2024-01-01", "New Year"]);
  worksheet.addRow(["2024-08-15", "Independence Day"]);
  worksheet.addRow(["2024-10-02", "Gandhi Jayanti"]);

  return workbook.xlsx.writeBuffer();
};

const processUploadedHolidayFile = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];
  const holidays = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const date = new Date(row.getCell(1).value);
      const event = row.getCell(2).value;
      const isOptional = row.getCell(3).value === "true";

      holidays.push({ date, event, isOptional });
    }
  });

  for (const holiday of holidays) {
    await Holiday.updateOne(
      { date: holiday.date },
      { ...holiday },
      { upsert: true }
    );
  }

  fs.unlinkSync(filePath);

  return "Holidays updated successfully.";
};

module.exports = {
  excelExporter,
  generateHolidayTemplate,
  processUploadedHolidayFile,
};
