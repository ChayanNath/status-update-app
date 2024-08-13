const ExcelJS = require("exceljs");

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
        description: status.description,
      });

      // Mark weekends in grey
      // TODO: Access all holidays and mark them also in different color
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
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

module.exports = excelExporter;
