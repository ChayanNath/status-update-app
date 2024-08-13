const ExcelJS = require("exceljs");

const excelExporter = async (statuses) => {
  const workbook = new ExcelJS.Workbook();

  // Group statuses by user
  const statusesByUser = statuses.reduce((acc, status) => {
    const fullName = `${status.user.firstName} ${status.user.lastName}`;
    if (!acc[fullName]) {
      acc[fullName] = [];
    }
    acc[fullName].push(status);
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
        date: status.date.toLocaleDateString(), // Format the date
        title: status.title,
        description: status.description,
      });
    });
  });

  // Write the Excel file to buffer
  return workbook.xlsx.writeBuffer();
};

module.exports = excelExporter;
