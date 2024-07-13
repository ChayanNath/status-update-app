const ExcelJS = require("exceljs");

const excelExporter = (statuses) => {
  const workbook = new ExcelJS.Workbook();

  // Group statuses by user
  const statusesByUser = statuses.reduce((acc, status) => {
    if (!acc[status.user.username]) {
      acc[status.user.username] = [];
    }
    acc[status.user.username].push(status);
    return acc;
  }, {});

  // Create a sheet for each user
  Object.keys(statusesByUser).forEach((username) => {
    const sheet = workbook.addWorksheet(username);
    sheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
    ];

    statusesByUser[username].forEach((status) => {
      sheet.addRow({
        date: status.date,
        title: status.title,
        description: status.description,
      });
    });
  });

  // Write the Excel file to buffer
  return workbook.xlsx.writeBuffer();
};

module.exports = excelExporter;
