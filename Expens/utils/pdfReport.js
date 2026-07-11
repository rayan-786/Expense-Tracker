const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const REPORT_DIR = path.join(__dirname, "../uploads/reports");

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const COLORS = {
  primary: "#2563EB",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  text: "#1E293B",
  muted: "#64748B",
  border: "#E2E8F0",
  bg: "#F8FAFC",
  white: "#FFFFFF"
};

const money = value =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const date = value => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN");
};

const line = (doc, y) => {
  doc
    .strokeColor(COLORS.border)
    .lineWidth(.7)
    .moveTo(40, y)
    .lineTo(555, y)
    .stroke();
};

const card = (doc, x, y, w, h, title, value, color) => {

  doc
    .roundedRect(x, y, w, h, 10)
    .fillAndStroke(COLORS.white, COLORS.border);

  doc
    .fillColor(COLORS.muted)
    .fontSize(10)
    .text(title, x + 15, y + 12);

  doc
    .fillColor(color)
    .font("Helvetica-Bold")
    .fontSize(18)
    .text(value, x + 15, y + 34);

  doc.font("Helvetica");

};

const heading = (doc, text, y) => {

  doc
    .fillColor(COLORS.primary)
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(text, 40, y);

  doc.font("Helvetica");

};

exports.generatePdf = async (report, charts = {}) => {

  return new Promise((resolve, reject) => {

    try {

      const fileName = `Expense_Report_${Date.now()}.pdf`;

      const filePath = path.join(
        REPORT_DIR,
        fileName
      );

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        bufferPages: true
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      let y = 40;
            doc
        .rect(0, 0, 595, 90)
        .fill(COLORS.primary);

      doc
        .fillColor("#FFFFFF")
        .font("Helvetica-Bold")
        .fontSize(24)
        .text("Expense Tracker", 40, 28);

      doc
        .fontSize(13)
        .font("Helvetica")
        .text("Financial Report", 40, 58);

      doc
        .font("Helvetica")
        .fontSize(10)
        .text(
          `Generated : ${new Date().toLocaleString("en-IN")}`,
          380,
          30,
          {
            width: 170,
            align: "right"
          }
        );

      doc
        .text(
          `Transactions : ${report.statistics?.totalTransactions || 0}`,
          380,
          48,
          {
            width: 170,
            align: "right"
          }
        );

      y = 110;

      heading(doc, "Report Information", y);

      y += 28;

      doc
        .fillColor(COLORS.text)
        .fontSize(11)
        .text(
          `Start Date : ${report.filters.start_date || "All"}`,
          40,
          y
        );

      doc.text(
        `End Date : ${report.filters.end_date || "All"}`,
        230,
        y
      );

      doc.text(
        `Category : ${report.filters.category_id || "All"}`,
        400,
        y
      );

      y += 22;

      doc.text(
        `Account : ${report.filters.account_id || "All"}`,
        40,
        y
      );

      doc.text(
        `Type : ${report.filters.type || "All"}`,
        230,
        y
      );

      line(doc, y + 24);

      y += 42;

      heading(doc, "Financial Summary", y);

      y += 28;

      const cardWidth = 118;
      const gap = 10;

      card(
        doc,
        40,
        y,
        cardWidth,
        70,
        "Income",
        money(report.summary.income),
        COLORS.success
      );

      card(
        doc,
        40 + cardWidth + gap,
        y,
        cardWidth,
        70,
        "Expense",
        money(report.summary.expense),
        COLORS.danger
      );

      card(
        doc,
        40 + (cardWidth + gap) * 2,
        y,
        cardWidth,
        70,
        "Savings",
        money(report.summary.savings),
        report.summary.savings >= 0
          ? COLORS.success
          : COLORS.danger
      );

      card(
        doc,
        40 + (cardWidth + gap) * 3,
        y,
        cardWidth,
        70,
        "Cash Flow",
        money(report.summary.cashFlow),
        report.summary.cashFlow >= 0
          ? COLORS.success
          : COLORS.danger
      );

      y += 100;
            heading(doc, "Financial Charts", y);

      y += 28;

      const leftChart = charts.expenseCategoryChart;
      const rightChart = charts.incomeExpenseChart;

      if (leftChart && fs.existsSync(leftChart)) {

        doc.roundedRect(40, y, 235, 185, 8)
          .stroke(COLORS.border);

        doc.font("Helvetica-Bold")
          .fontSize(11)
          .fillColor(COLORS.text)
          .text("Expense By Category", 55, y + 10);

        doc.image(leftChart, 55, y + 30, {
          fit: [205, 140],
          align: "center"
        });

        console.log(leftChart);
        console.log(rightChart);

      }

      if (rightChart && fs.existsSync(rightChart)) {

        doc.roundedRect(315, y, 240, 185, 8)
          .stroke(COLORS.border);

        doc.font("Helvetica-Bold")
          .fontSize(11)
          .fillColor(COLORS.text)
          .text("Income vs Expense", 330, y + 10);

        doc.image(rightChart, 325, y + 30, {
          fit: [215, 140],
          align: "center"
        });

      }

      y += 205;

      heading(doc, "Top Expense Categories", y);

      y += 26;

      const tableX = 40;
      const cols = [220,120,100];

      doc.rect(tableX, y, 480, 24)
        .fill(COLORS.primary);

      doc.fillColor("#FFF")
        .font("Helvetica-Bold")
        .fontSize(10);

      doc.text("Category", tableX + 10, y + 7);

      doc.text("Amount", tableX + cols[0] + 10, y + 7);

      doc.text("%", tableX + cols[0] + cols[1] + 10, y + 7);

      y += 24;

      const totalExpense =
        Number(report.summary.expense || 0);

      (report.topCategories || []).forEach((item, index) => {

        const amount = Number(item.amount);

        const percent =
          totalExpense > 0
            ? ((amount / totalExpense) * 100).toFixed(1)
            : "0.0";

        if (index % 2 === 0) {

          doc.rect(tableX, y, 480, 24)
            .fill("#F8FAFC");

        }

        doc.fillColor(COLORS.text)
          .font("Helvetica")
          .fontSize(10);

        doc.text(
          item.category,
          tableX + 10,
          y + 7
        );

        doc.text(
          money(amount),
          tableX + cols[0] + 10,
          y + 7
        );

        doc.text(
          `${percent}%`,
          tableX + cols[0] + cols[1] + 10,
          y + 7
        );

        y += 24;

      });

      doc.addPage();

      y = 40;
            heading(doc, "Expense Transactions", y);

      y += 28;

      const startX = 40;

      const widths = [70, 150, 95, 90, 95];

      doc.rect(startX, y, 500, 24)
        .fill(COLORS.primary);

      doc.fillColor("#FFF")
        .font("Helvetica-Bold")
        .fontSize(10);

      doc.text("Date", startX + 8, y + 7);

      doc.text("Title", startX + widths[0] + 8, y + 7);

      doc.text(
        "Category",
        startX + widths[0] + widths[1] + 8,
        y + 7
      );

      doc.text(
        "Account",
        startX + widths[0] + widths[1] + widths[2] + 8,
        y + 7
      );

      doc.text(
        "Amount",
        startX + widths[0] + widths[1] + widths[2] + widths[3] + 8,
        y + 7
      );

      y += 24;

      (report.transactions || []).forEach((item, index) => {

        if (y > 730) {

          doc.addPage();

          y = 40;

          doc.rect(startX, y, 500, 24)
            .fill(COLORS.primary);

          doc.fillColor("#FFF")
            .font("Helvetica-Bold")
            .fontSize(10);

          doc.text("Date", startX + 8, y + 7);

          doc.text("Title", startX + widths[0] + 8, y + 7);

          doc.text(
            "Category",
            startX + widths[0] + widths[1] + 8,
            y + 7
          );

          doc.text(
            "Account",
            startX + widths[0] + widths[1] + widths[2] + 8,
            y + 7
          );

          doc.text(
            "Amount",
            startX + widths[0] + widths[1] + widths[2] + widths[3] + 8,
            y + 7
          );

          y += 24;

        }

        if (index % 2 === 0) {

          doc.rect(startX, y, 500, 24)
            .fill("#F8FAFC");

        }

        doc.fillColor(COLORS.text)
          .font("Helvetica")
          .fontSize(9);

        doc.text(
          date(item.transaction_date),
          startX + 8,
          y + 7,
          { width: widths[0] - 10 }
        );

        doc.text(
          item.title || "-",
          startX + widths[0] + 8,
          y + 7,
          { width: widths[1] - 10 }
        );

        doc.text(
          item.category || "-",
          startX + widths[0] + widths[1] + 8,
          y + 7,
          { width: widths[2] - 10 }
        );

        doc.text(
          item.account || "-",
          startX + widths[0] + widths[1] + widths[2] + 8,
          y + 7,
          { width: widths[3] - 10 }
        );

        doc.fillColor(
          item.type === "income"
            ? COLORS.success
            : COLORS.danger
        );

        doc.text(
          money(item.amount),
          startX + widths[0] + widths[1] + widths[2] + widths[3] + 8,
          y + 7,
          {
            width: widths[4] - 10,
            align: "right"
          }
        );

        doc.fillColor(COLORS.text);

        y += 24;

      });

      y += 20;
            if (y > 560) {
        doc.addPage();
        y = 40;
      }

      heading(doc, "Budget Summary", y);

      y += 30;

      const budget = report.budget || {};

      card(
        doc,
        40,
        y,
        118,
        70,
        "Budget",
        money(budget.totalBudget),
        COLORS.primary
      );

      card(
        doc,
        170,
        y,
        118,
        70,
        "Spent",
        money(budget.spent),
        COLORS.danger
      );

      card(
        doc,
        300,
        y,
        118,
        70,
        "Remaining",
        money(budget.remaining),
        budget.remaining >= 0
          ? COLORS.success
          : COLORS.danger
      );

      card(
        doc,
        430,
        y,
        118,
        70,
        "Usage",
        `${budget.usage || 0}%`,
        COLORS.warning
      );

      y += 100;

      heading(doc, "Payment Methods", y);

      y += 28;

      const paymentX = 40;
      const paymentWidth = 510;

      doc
        .roundedRect(paymentX, y, paymentWidth, 30, 8)
        .fill(COLORS.primary);

      doc.fillColor("#FFF")
        .font("Helvetica-Bold")
        .fontSize(10);

      doc.text("Method", paymentX + 15, y + 10);
      doc.text("Transactions", 270, y + 10);
      doc.text("Amount", 430, y + 10);

      y += 30;

      (report.paymentMethods || []).forEach((item, index) => {

        if (index % 2 === 0) {
          doc.rect(paymentX, y, paymentWidth, 26)
            .fill("#F8FAFC");
        }

        doc.fillColor(COLORS.text)
          .font("Helvetica")
          .fontSize(10);

        doc.text(
          item.payment_method || "-",
          paymentX + 15,
          y + 8
        );

        doc.text(
          String(item.totalTransactions || 0),
          285,
          y + 8
        );

        doc.text(
          money(item.amount),
          420,
          y + 8,
          {
            width: 110,
            align: "right"
          }
        );

        y += 26;

      });

      y += 25;

      heading(doc, "Report Statistics", y);

      y += 30;

      const stats = report.statistics || {};

      const statistics = [
        ["Total Transactions", stats.totalTransactions],
        ["Income Transactions", stats.incomeTransactions],
        ["Expense Transactions", stats.expenseTransactions],
        ["Accounts", stats.totalAccounts],
        ["Categories", stats.totalCategories]
      ];

      statistics.forEach(([label, value]) => {

        doc.circle(48, y + 7, 2)
          .fill(COLORS.primary);

        doc.fillColor(COLORS.text)
          .fontSize(10)
          .text(label, 60, y);

        doc.font("Helvetica-Bold")
          .text(String(value ?? 0), 250, y);

        doc.font("Helvetica");

        y += 22;

      });
            y += 20;

      heading(doc, "Report Highlights", y);

      y += 28;

      const highlights = [

        `Total Income : ${money(report.summary?.income || 0)}`,

        `Total Expense : ${money(report.summary?.expense || 0)}`,

        `Net Savings : ${money(report.summary?.savings || 0)}`,

        `Cash Flow : ${money(report.summary?.cashFlow || 0)}`,

        `Budget Status : ${budget.status || "N/A"}`,

        `Generated : ${new Date().toLocaleString("en-IN")}`

      ];

      highlights.forEach((text) => {

        if (y > 730) {

          doc.addPage();

          y = 40;

        }

        doc.circle(48, y + 6, 2)
          .fill(COLORS.primary);

        doc.fillColor(COLORS.text)
          .font("Helvetica")
          .fontSize(10)
          .text(text, 60, y);

        y += 22;

      });

      /* ---------- Footer ---------- */

      const range = doc.bufferedPageRange();

      for (let i = 0; i < range.count; i++) {

        doc.switchToPage(i);

        const pageHeight = doc.page.height;

        line(doc, pageHeight - 45);

        doc
          .fillColor(COLORS.muted)
          .fontSize(9)
          .font("Helvetica")
          .text(
            "Expense Tracker • Financial Report",
            40,
            pageHeight - 32
          );

        doc.text(

          `Page ${i + 1} of ${range.count}`,

          420,

          pageHeight - 32,

          {

            width: 120,

            align: "right"

          }

        );

      }

      doc.end();

      stream.on("finish", () => {

        resolve(filePath);

      });

      stream.on("error", reject);

    }

    catch (error) {

      reject(error);

    }

  });

};