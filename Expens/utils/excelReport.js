const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

exports.generateExcel = async (report) => {

  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet(

    "Expense Report"

  );

  /* =====================================================
     SUMMARY
  ===================================================== */

  sheet.columns = [

    {

      header: "Field",

      key: "field",

      width: 25

    },

    {

      header: "Value",

      key: "value",

      width: 20

    }

  ];

  sheet.addRow({

    field: "Income",

    value: report.summary.income

  });

  sheet.addRow({

    field: "Expense",

    value: report.summary.expense

  });

  sheet.addRow({

    field: "Savings",

    value: report.summary.savings

  });

  sheet.addRow({

    field: "Balance",

    value: report.summary.balance

  });

  sheet.addRow([]);

  /* =====================================================
     TOP EXPENSES
  ===================================================== */

  sheet.addRow([

    "Top Expenses"

  ]);

  sheet.addRow([

    "Title",

    "Category",

    "Amount",

    "Date"

  ]);

  report.topExpenses.forEach((item) => {

    sheet.addRow([

      item.title,

      item.category_name,

      item.amount,

      item.transaction_date

    ]);

  });

  const reportsDir = path.join(

    __dirname,

    "../uploads/reports"

  );

  if (!fs.existsSync(reportsDir)) {

    fs.mkdirSync(

      reportsDir,

      { recursive: true }

    );

  }

  const fileName = `Expense_Report_${Date.now()}.xlsx`;

  const filePath = path.join(

    reportsDir,

    fileName

  );

  await workbook.xlsx.writeFile(

    filePath

  );

  return filePath;

};