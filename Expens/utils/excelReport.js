const ExcelJS = require("exceljs");

exports.generateExcel = async (report) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Expense Tracker";
  workbook.created = new Date();

  /* =========================================================
     SUMMARY SHEET
  ========================================================= */

  const summarySheet = workbook.addWorksheet("Summary");

  summarySheet.columns = [
    {
      header: "Report",
      key: "report",
      width: 25,
    },
    {
      header: "Value",
      key: "value",
      width: 25,
    },
  ];

  summarySheet.addRows([
    {
      report: "Total Income",
      value: Number(report.summary?.income || 0),
    },
    {
      report: "Total Expense",
      value: Number(report.summary?.expense || 0),
    },
    {
      report: "Balance",
      value: Number(report.summary?.balance || 0),
    },
  ]);

  summarySheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     CATEGORY BREAKDOWN
  ========================================================= */

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

  if (Array.isArray(report.expenseByCategory)) {
    report.expenseByCategory.forEach((item) => {
      categorySheet.addRow({
        category: item.category || "Unknown",
        amount: Number(item.amount || 0),
      });
    });
  }

  categorySheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     TOP EXPENSES
  ========================================================= */

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
        description: item.title || "Expense",

        category: item.category_name || "N/A",

        amount: Number(item.amount || 0),

        date: item.transaction_date || "",
      });
    });
  }

  expenseSheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     MONTHLY SUMMARY
  ========================================================= */

  const monthlySheet = workbook.addWorksheet("Monthly Summary");

  monthlySheet.columns = [
    {
      header: "Year",
      key: "year",
      width: 12,
    },
    {
      header: "Month",
      key: "month",
      width: 15,
    },
    {
      header: "Income",
      key: "income",
      width: 20,
    },
    {
      header: "Expense",
      key: "expense",
      width: 20,
    },
  ];

  if (Array.isArray(report.monthlySummary)) {
    report.monthlySummary.forEach((item) => {
      monthlySheet.addRow({
        year: item.year || "",
        month: item.month || "",
        income: Number(item.income || 0),
        expense: Number(item.expense || 0),
      });
    });
  }

  monthlySheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     PAYMENT METHODS
  ========================================================= */

  const paymentSheet = workbook.addWorksheet("Payment Methods");

  paymentSheet.columns = [
    {
      header: "Payment Method",
      key: "payment_method",
      width: 25,
    },
    {
      header: "Amount",
      key: "amount",
      width: 20,
    },
    {
      header: "Transactions",
      key: "totalTransactions",
      width: 20,
    },
  ];

  if (Array.isArray(report.paymentMethods)) {
    report.paymentMethods.forEach((item) => {
      paymentSheet.addRow({
        payment_method:
          item.payment_method || "Unknown",

        amount: Number(item.amount || 0),

        totalTransactions:
          Number(item.totalTransactions || 0),
      });
    });
  }

  paymentSheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     ACCOUNTS
  ========================================================= */

  const accountSheet = workbook.addWorksheet("Accounts");

  accountSheet.columns = [
    {
      header: "Account",
      key: "name",
      width: 25,
    },
    {
      header: "Type",
      key: "type",
      width: 20,
    },
    {
      header: "Opening Balance",
      key: "opening_balance",
      width: 20,
    },
    {
      header: "Current Balance",
      key: "current_balance",
      width: 20,
    },
  ];

  if (Array.isArray(report.accounts)) {
    report.accounts.forEach((item) => {
      accountSheet.addRow({
        name: item.name || "Unknown",

        type: item.type || "N/A",

        opening_balance:
          Number(item.opening_balance || 0),

        current_balance:
          Number(item.current_balance || 0),
      });
    });
  }

  accountSheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     TRANSACTIONS
  ========================================================= */

  const transactionSheet =
    workbook.addWorksheet("Transactions");

  transactionSheet.columns = [
    {
      header: "Title",
      key: "title",
      width: 30,
    },
    {
      header: "Type",
      key: "type",
      width: 15,
    },
    {
      header: "Amount",
      key: "amount",
      width: 20,
    },
    {
      header: "Category",
      key: "category",
      width: 25,
    },
    {
      header: "Account",
      key: "account",
      width: 25,
    },
    {
      header: "Payment Method",
      key: "payment_method",
      width: 20,
    },
    {
      header: "Date",
      key: "transaction_date",
      width: 20,
    },
    {
      header: "Reference",
      key: "reference_no",
      width: 25,
    },
  ];

  if (Array.isArray(report.transactions)) {
    report.transactions.forEach((item) => {
      transactionSheet.addRow({
        title: item.title || "",

        type: item.type || "",

        amount: Number(item.amount || 0),

        category: item.category || "N/A",

        account: item.account || "N/A",

        payment_method:
          item.payment_method || "N/A",

        transaction_date:
          item.transaction_date || "",

        reference_no:
          item.reference_no || "",
      });
    });
  }

  transactionSheet.getRow(1).font = {
    bold: true,
  };

  /* =========================================================
     AUTO FILTER
  ========================================================= */

  [
    summarySheet,
    categorySheet,
    expenseSheet,
    monthlySheet,
    paymentSheet,
    accountSheet,
    transactionSheet,
  ].forEach((sheet) => {
    if (sheet.rowCount > 1) {
      sheet.autoFilter = {
        from: "A1",
        to: `${String.fromCharCode(
          64 + sheet.columnCount
        )}1`,
      };
    }
  });

  /* =========================================================
     RETURN BUFFER
     IMPORTANT FOR VERCEL / SERVERLESS
  ========================================================= */

  const buffer =
    await workbook.xlsx.writeBuffer();

  return buffer;
};