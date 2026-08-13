const ExcelJS = require("exceljs");

exports.generateExcel = async (report) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Expense Tracker";
  workbook.created = new Date();

  // =========================================================
  // SUMMARY SHEET
  // =========================================================

  const summarySheet = workbook.addWorksheet("Summary");

  summarySheet.columns = [
    { header: "Report", key: "report", width: 25 },
    { header: "Value", key: "value", width: 25 },
  ];

  summarySheet.addRows([
    {
      report: "Total Income",
      value: report.totalIncome || 0,
    },
    {
      report: "Total Expense",
      value: report.totalExpense || 0,
    },
    {
      report: "Balance",
      value: report.balance || 0,
    },
  ]);

  summarySheet.getRow(1).font = {
    bold: true,
  };

  // =========================================================
  // CATEGORY BREAKDOWN
  // =========================================================

  const categorySheet = workbook.addWorksheet("Categories");

  categorySheet.columns = [
    {
      header: "Category",
      key: "category",
      width: 30,
    },
    {
      header: "Amount",
      key: "amount",
      width: 20,
    },
  ];

  if (Array.isArray(report.categoryBreakdown)) {
    report.categoryBreakdown.forEach((item) => {
      categorySheet.addRow({
        category:
          item.category ||
          item.name ||
          "Unknown",

        amount:
          item.amount ||
          item.total ||
          0,
      });
    });
  }

  categorySheet.getRow(1).font = {
    bold: true,
  };

  // =========================================================
  // TOP EXPENSES
  // =========================================================

  const expenseSheet = workbook.addWorksheet("Top Expenses");

  expenseSheet.columns = [
    {
      header: "Description",
      key: "description",
      width: 35,
    },
    {
      header: "Category",
      key: "category",
      width: 25,
    },
    {
      header: "Amount",
      key: "amount",
      width: 20,
    },
    {
      header: "Date",
      key: "date",
      width: 20,
    },
  ];

  if (Array.isArray(report.topExpenses)) {
    report.topExpenses.forEach((item) => {
      expenseSheet.addRow({
        description:
          item.description ||
          item.title ||
          "Expense",

        category:
          item.category ||
          item.categoryName ||
          "N/A",

        amount:
          item.amount ||
          0,

        date:
          item.date ||
          item.created_at ||
          "",
      });
    });
  }

  expenseSheet.getRow(1).font = {
    bold: true,
  };

  // =========================================================
  // IMPORTANT FOR VERCEL
  // DO NOT USE workbook.xlsx.writeFile()
  // RETURN BUFFER INSTEAD
  // =========================================================

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};