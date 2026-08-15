const PDFDocument = require("pdfkit");

/* =========================================================
   GENERATE PROFESSIONAL PDF REPORT
========================================================= */

exports.generatePDF = (report = {}) => {

  return new Promise((resolve, reject) => {

    try {

      const doc = new PDFDocument({
        size: "A4",
        margin: 45,
        bufferPages: true,

        info: {
          Title: "Expense Tracker Financial Report",
          Author: "Rayan Ahmad",
          Subject: "Personal Financial Report",
          Creator: "Expense Tracker"
        }
      });


      /* =====================================================
         PDF BUFFER
      ===================================================== */

      const chunks = [];

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      doc.on("error", reject);

      doc.on("end", () => {

        const buffer = Buffer.concat(chunks);

        resolve(buffer);

      });


      /* =====================================================
         COLORS
      ===================================================== */

      const COLORS = {

        primary: "#2563EB",
        primaryDark: "#1D4ED8",
        primaryLight: "#EFF6FF",

        dark: "#0F172A",
        text: "#334155",
        muted: "#64748B",

        white: "#FFFFFF",

        border: "#E2E8F0",
        background: "#F8FAFC",

        success: "#16A34A",
        successBg: "#F0FDF4",

        danger: "#DC2626",
        dangerBg: "#FEF2F2",

        warning: "#D97706",
        warningBg: "#FFFBEB"

      };


      /* =====================================================
         BASIC HELPERS
      ===================================================== */

      const safeNumber = (value) => {

        const number = Number(value);

        return Number.isFinite(number)
          ? number
          : 0;

      };


      const money = (value) => {

        const amount = safeNumber(value);

        return `Rs. ${amount.toLocaleString(
          "en-IN",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        )}`;

      };


      const safeText = (
        value,
        fallback = "-"
      ) => {

        if (
          value === null ||
          value === undefined ||
          String(value).trim() === ""
        ) {

          return fallback;

        }

        return String(value);

      };


      const formatDate = (value) => {

        if (!value) {
          return "-";
        }

        try {

          const date = new Date(value);

          if (Number.isNaN(date.getTime())) {
            return String(value);
          }

          return date.toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }
          );

        } catch {

          return String(value);

        }

      };


      const drawRoundedBox = (
        x,
        y,
        width,
        height,
        background,
        radius = 10
      ) => {

        doc
          .roundedRect(
            x,
            y,
            width,
            height,
            radius
          )
          .fill(background);

      };


      const drawBorderedBox = (
        x,
        y,
        width,
        height,
        background = COLORS.white
      ) => {

        doc
          .roundedRect(
            x,
            y,
            width,
            height,
            10
          )
          .fillAndStroke(
            background,
            COLORS.border
          );

      };


      const drawDivider = () => {

        const y = doc.y;

        doc
          .strokeColor(COLORS.border)
          .lineWidth(1)
          .moveTo(45, y)
          .lineTo(550, y)
          .stroke();

        doc.y = y + 14;

      };


      const ensureSpace = (
        height = 100
      ) => {

        if (
          doc.y + height >
          doc.page.height - 75
        ) {

          doc.addPage();

          doc.y = 70;

          return true;

        }

        return false;

      };


      const sectionTitle = (
        title,
        subtitle = null
      ) => {

        ensureSpace(
          subtitle ? 55 : 35
        );

        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .fillColor(COLORS.dark)
          .text(
            title,
            45,
            doc.y
          );

        if (subtitle) {

          doc
            .moveDown(0.25)
            .font("Helvetica")
            .fontSize(9)
            .fillColor(COLORS.muted)
            .text(
              subtitle,
              45,
              doc.y,
              {
                width: 505
              }
            );

        }

        doc.moveDown(0.7);

      };


      /* =====================================================
         HEADER
      ===================================================== */

      const drawHeader = () => {

        doc
          .rect(
            0,
            0,
            doc.page.width,
            92
          )
          .fill(COLORS.primary);


        doc
          .font("Helvetica-Bold")
          .fontSize(22)
          .fillColor(COLORS.white)
          .text(
            "Expense Tracker",
            45,
            25
          );


        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#DBEAFE")
          .text(
            "PERSONAL FINANCE MANAGEMENT",
            45,
            57
          );


        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor(COLORS.white)
          .text(
            "FINANCIAL REPORT",
            395,
            27,
            {
              width: 155,
              align: "right"
            }
          );


        doc
          .font("Helvetica")
          .fontSize(8)
          .fillColor("#DBEAFE")
          .text(
            `Generated ${formatDate(new Date())}`,
            395,
            46,
            {
              width: 155,
              align: "right"
            }
          );


        doc.y = 118;

      };


      /* =====================================================
         FOOTER
      ===================================================== */

      const drawFooter = () => {

        const y =
          doc.page.height - 42;


        doc
          .strokeColor(COLORS.border)
          .lineWidth(1)
          .moveTo(45, y - 10)
          .lineTo(550, y - 10)
          .stroke();


        doc
          .font("Helvetica")
          .fontSize(7.5)
          .fillColor(COLORS.muted)
          .text(
            "Expense Tracker",
            45,
            y
          );


        doc
          .font("Helvetica")
          .fontSize(7.5)
          .fillColor(COLORS.muted)
          .text(
            "Prepared by Rayan Ahmad",
            205,
            y,
            {
              width: 185,
              align: "center"
            }
          );

      };


      /* =====================================================
         KPI CARD
      ===================================================== */

      const kpiCard = (
        x,
        y,
        width,
        label,
        value,
        accent,
        background
      ) => {

        drawRoundedBox(
          x,
          y,
          width,
          88,
          background,
          10
        );


        doc
          .rect(
            x,
            y,
            4,
            88
          )
          .fill(accent);


        doc
          .font("Helvetica-Bold")
          .fontSize(8)
          .fillColor(accent)
          .text(
            label.toUpperCase(),
            x + 15,
            y + 15,
            {
              width: width - 25
            }
          );


        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .fillColor(COLORS.dark)
          .text(
            value,
            x + 15,
            y + 40,
            {
              width: width - 25,
              ellipsis: true
            }
          );

      };


      /* =====================================================
         TABLE HEADER
      ===================================================== */

      const tableHeader = (
        columns,
        y,
        height = 29
      ) => {

        doc
          .roundedRect(
            45,
            y,
            505,
            height,
            5
          )
          .fill(COLORS.dark);


        columns.forEach(
          (column) => {

            doc
              .font("Helvetica-Bold")
              .fontSize(7.5)
              .fillColor(COLORS.white)
              .text(
                column.label,
                column.x,
                y + 10,
                {
                  width: column.width,
                  align:
                    column.align ||
                    "left",
                  lineBreak: false
                }
              );

          }
        );

      };


      /* =====================================================
         TABLE ROW
      ===================================================== */

      const tableRowBackground = (
        y,
        height,
        index
      ) => {

        if (index % 2 === 0) {

          doc
            .rect(
              45,
              y,
              505,
              height
            )
            .fill(
              COLORS.background
            );

        }

      };


      /* =====================================================
         INITIAL HEADER
      ===================================================== */

      drawHeader();


      /* =====================================================
         REPORT INTRO
      ===================================================== */

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor(COLORS.dark)
        .text(
          "Financial Overview",
          45,
          doc.y
        );


      doc
        .moveDown(0.3)
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.muted)
        .text(
          "A clear overview of your income, expenses, savings and spending activity.",
          45,
          doc.y,
          {
            width: 505
          }
        );


      doc.moveDown(1.4);


      /* =====================================================
         ACTUAL REPORT DATA
         
         IMPORTANT:
         buildReport() returns:
         
         report.summary.income
         report.summary.expense
         report.summary.balance
         
         NOT:
         
         report.totalIncome
         report.totalExpense
         report.balance
      ===================================================== */

      const totalIncome =
        safeNumber(
          report?.summary?.income
        );


      const totalExpense =
        safeNumber(
          report?.summary?.expense
        );


      const balance =
        safeNumber(
          report?.summary?.balance
        );


      /* =====================================================
         KPI CARDS
      ===================================================== */

      const cardWidth = 155;
      const cardGap = 20;

      const cardY = doc.y;


      kpiCard(
        45,
        cardY,
        cardWidth,
        "Total Income",
        money(totalIncome),
        COLORS.success,
        COLORS.successBg
      );


      kpiCard(
        45 +
          cardWidth +
          cardGap,
        cardY,
        cardWidth,
        "Total Expense",
        money(totalExpense),
        COLORS.danger,
        COLORS.dangerBg
      );


      kpiCard(
        45 +
          (cardWidth + cardGap) * 2,
        cardY,
        cardWidth,
        "Current Balance",
        money(balance),
        COLORS.primary,
        COLORS.primaryLight
      );


      doc.y =
        cardY + 110;


      /* =====================================================
         FINANCIAL HEALTH
      ===================================================== */

      sectionTitle(
        "Financial Health",
        "A quick view of income versus spending."
      );


      let healthText = "Healthy";

      let healthColor =
        COLORS.success;

      let healthBg =
        COLORS.successBg;


      if (
        totalIncome === 0 &&
        totalExpense === 0
      ) {

        healthText =
          "No Activity";

        healthColor =
          COLORS.muted;

        healthBg =
          COLORS.background;

      } else if (
        totalExpense >
        totalIncome
      ) {

        healthText =
          "Needs Attention";

        healthColor =
          COLORS.danger;

        healthBg =
          COLORS.dangerBg;

      } else if (
        totalIncome > 0 &&
        totalExpense >
        totalIncome * 0.8
      ) {

        healthText =
          "Watch Spending";

        healthColor =
          COLORS.warning;

        healthBg =
          COLORS.warningBg;

      }


      drawRoundedBox(
        45,
        doc.y,
        505,
        58,
        healthBg,
        9
      );


      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(healthColor)
        .text(
          healthText,
          62,
          doc.y + 12
        );


      const savingsRate =
        totalIncome > 0
          ? (
              (
                totalIncome -
                totalExpense
              ) /
              totalIncome
            ) * 100
          : 0;


      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor(COLORS.text)
        .text(
          `Remaining balance ratio: ${savingsRate.toFixed(1)}%`,
          62,
          doc.y + 31
        );


      doc.y += 78;


      /* =====================================================
         CATEGORY ANALYSIS
      ===================================================== */

      sectionTitle(
        "Category Analysis",
        "Expense distribution across your categories."
      );


      const categories =
        Array.isArray(
          report?.expenseByCategory
        )
          ? report.expenseByCategory
          : [];


      if (
        categories.length === 0
      ) {

        drawRoundedBox(
          45,
          doc.y,
          505,
          52,
          COLORS.background,
          8
        );


        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor(COLORS.muted)
          .text(
            "No category data available for this reporting period.",
            60,
            doc.y + 19,
            {
              width: 475
            }
          );


        doc.y += 72;

      } else {

        let categoryHeaderY =
          doc.y;


        tableHeader(
          [
            {
              label: "CATEGORY",
              x: 58,
              width: 285
            },
            {
              label: "AMOUNT",
              x: 405,
              width: 120,
              align: "right"
            }
          ],
          categoryHeaderY
        );


        doc.y =
          categoryHeaderY + 29;


        categories.forEach(
          (item, index) => {

            if (
              doc.y + 29 >
              doc.page.height - 75
            ) {

              doc.addPage();

              doc.y = 70;

              sectionTitle(
                "Category Analysis",
                "Continued"
              );

              tableHeader(
                [
                  {
                    label: "CATEGORY",
                    x: 58,
                    width: 285
                  },
                  {
                    label: "AMOUNT",
                    x: 405,
                    width: 120,
                    align: "right"
                  }
                ],
                doc.y
              );

              doc.y += 29;

            }


            const category =
              safeText(
                item.category ||
                item.categoryName ||
                item.category_name,
                "Uncategorized"
              );


            const amount =
              safeNumber(
                item.amount ??
                item.total
              );


            tableRowBackground(
              doc.y,
              29,
              index
            );


            doc
              .font("Helvetica")
              .fontSize(8.5)
              .fillColor(COLORS.text)
              .text(
                category,
                58,
                doc.y + 9,
                {
                  width: 285,
                  ellipsis: true,
                  lineBreak: false
                }
              );


            doc
              .font("Helvetica-Bold")
              .fontSize(8.5)
              .fillColor(COLORS.dark)
              .text(
                money(amount),
                405,
                doc.y + 9,
                {
                  width: 120,
                  align: "right",
                  lineBreak: false
                }
              );


            doc.y += 29;

          }
        );


        doc.moveDown(1);

      }


      /* =====================================================
         TOP EXPENSES
      ===================================================== */

      ensureSpace(160);


      sectionTitle(
        "Top Expenses",
        "Largest recorded expenses in the selected reporting period."
      );


      const expenses =
        Array.isArray(
          report?.topExpenses
        )
          ? report.topExpenses
          : [];


      if (
        expenses.length === 0
      ) {

        drawRoundedBox(
          45,
          doc.y,
          505,
          52,
          COLORS.background,
          8
        );


        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor(COLORS.muted)
          .text(
            "No expense data available.",
            60,
            doc.y + 19
          );


        doc.y += 72;

      } else {

        let expenseHeaderY =
          doc.y;


        tableHeader(
          [
            {
              label: "#",
              x: 55,
              width: 22
            },
            {
              label: "DESCRIPTION",
              x: 82,
              width: 185
            },
            {
              label: "CATEGORY",
              x: 280,
              width: 125
            },
            {
              label: "AMOUNT",
              x: 420,
              width: 115,
              align: "right"
            }
          ],
          expenseHeaderY
        );


        doc.y =
          expenseHeaderY + 29;


        expenses.forEach(
          (item, index) => {

            if (
              doc.y + 32 >
              doc.page.height - 75
            ) {

              doc.addPage();

              doc.y = 70;

              sectionTitle(
                "Top Expenses",
                "Continued"
              );


              tableHeader(
                [
                  {
                    label: "#",
                    x: 55,
                    width: 22
                  },
                  {
                    label: "DESCRIPTION",
                    x: 82,
                    width: 185
                  },
                  {
                    label: "CATEGORY",
                    x: 280,
                    width: 125
                  },
                  {
                    label: "AMOUNT",
                    x: 420,
                    width: 115,
                    align: "right"
                  }
                ],
                doc.y
              );


              doc.y += 29;

            }


            const description =
              safeText(
                item.description ||
                item.title,
                "Expense"
              );


            const category =
              safeText(
                item.category ||
                item.categoryName ||
                item.category_name,
                "N/A"
              );


            const amount =
              safeNumber(
                item.amount
              );


            const date =
              item.date ||
              item.created_at ||
              item.transaction_date ||
              "";


            tableRowBackground(
              doc.y,
              32,
              index
            );


            doc
              .font("Helvetica")
              .fontSize(8)
              .fillColor(COLORS.muted)
              .text(
                String(index + 1),
                55,
                doc.y + 11,
                {
                  width: 22,
                  lineBreak: false
                }
              );


            doc
              .font("Helvetica")
              .fontSize(8.2)
              .fillColor(COLORS.text)
              .text(
                description,
                82,
                doc.y + 8,
                {
                  width: 185,
                  height: 16,
                  ellipsis: true,
                  lineBreak: false
                }
              );


            doc
              .font("Helvetica")
              .fontSize(7.8)
              .fillColor(COLORS.muted)
              .text(
                category,
                280,
                doc.y + 8,
                {
                  width: 125,
                  height: 16,
                  ellipsis: true,
                  lineBreak: false
                }
              );


            doc
              .font("Helvetica-Bold")
              .fontSize(8)
              .fillColor(COLORS.dark)
              .text(
                money(amount),
                420,
                doc.y + 8,
                {
                  width: 115,
                  align: "right",
                  lineBreak: false
                }
              );


            doc.y += 32;


            /*
               Keep date available without breaking
               the compact SaaS table layout.

               If a date exists, it is shown in a
               small secondary line below the table
               only when space permits.
            */

            if (
              date &&
              index === expenses.length - 1
            ) {

              doc
                .moveDown(0.3)
                .font("Helvetica")
                .fontSize(7)
                .fillColor(COLORS.muted)
                .text(
                  `Latest transaction date: ${formatDate(date)}`,
                  45,
                  doc.y
                );

            }

          }
        );

      }


      /* =====================================================
         PAGE 2 - MONTHLY + PAYMENT ANALYSIS
      ===================================================== */

      const monthly =
        Array.isArray(
          report?.monthlySummary
        )
          ? report.monthlySummary
          : [];


      const payments =
        Array.isArray(
          report?.paymentMethods
        )
          ? report.paymentMethods
          : [];


      if (
        monthly.length > 0 ||
        payments.length > 0
      ) {

        doc.addPage();

        doc.y = 70;


        /* ===================================================
           MONTHLY PERFORMANCE
        =================================================== */

        sectionTitle(
          "Monthly Performance",
          "Income and expenses across the selected period."
        );


        if (
          monthly.length === 0
        ) {

          drawRoundedBox(
            45,
            doc.y,
            505,
            50,
            COLORS.background,
            8
          );


          doc
            .font("Helvetica")
            .fontSize(9)
            .fillColor(COLORS.muted)
            .text(
              "No monthly performance data available.",
              60,
              doc.y + 18
            );


          doc.y += 70;

        } else {

          tableHeader(
            [
              {
                label: "MONTH",
                x: 58,
                width: 175
              },
              {
                label: "INCOME",
                x: 270,
                width: 110,
                align: "right"
              },
              {
                label: "EXPENSE",
                x: 400,
                width: 120,
                align: "right"
              }
            ],
            doc.y
          );


          doc.y += 29;


          monthly.forEach(
            (item, index) => {

              if (
                doc.y + 30 >
                doc.page.height - 75
              ) {

                doc.addPage();

                doc.y = 70;

                sectionTitle(
                  "Monthly Performance",
                  "Continued"
                );


                tableHeader(
                  [
                    {
                      label: "MONTH",
                      x: 58,
                      width: 175
                    },
                    {
                      label: "INCOME",
                      x: 270,
                      width: 110,
                      align: "right"
                    },
                    {
                      label: "EXPENSE",
                      x: 400,
                      width: 120,
                      align: "right"
                    }
                  ],
                  doc.y
                );


                doc.y += 29;

              }


              const month =
                safeText(
                  item.month ||
                  item.label,
                  "-"
                );


              const income =
                safeNumber(
                  item.income ??
                  item.totalIncome
                );


              const expense =
                safeNumber(
                  item.expense ??
                  item.totalExpense
                );


              tableRowBackground(
                doc.y,
                30,
                index
              );


              doc
                .font("Helvetica")
                .fontSize(8.5)
                .fillColor(COLORS.text)
                .text(
                  month,
                  58,
                  doc.y + 9,
                  {
                    width: 175,
                    ellipsis: true,
                    lineBreak: false
                  }
                );


              doc
                .font("Helvetica-Bold")
                .fontSize(8.5)
                .fillColor(COLORS.success)
                .text(
                  money(income),
                  270,
                  doc.y + 9,
                  {
                    width: 110,
                    align: "right",
                    lineBreak: false
                  }
                );


              doc
                .font("Helvetica-Bold")
                .fontSize(8.5)
                .fillColor(COLORS.danger)
                .text(
                  money(expense),
                  400,
                  doc.y + 9,
                  {
                    width: 120,
                    align: "right",
                    lineBreak: false
                  }
                );


              doc.y += 30;

            }
          );

        }


        /* ===================================================
           PAYMENT METHODS
        =================================================== */

        if (
          payments.length > 0
        ) {

          doc.moveDown(1.5);


          sectionTitle(
            "Payment Methods",
            "Transaction value grouped by payment method."
          );


          tableHeader(
            [
              {
                label: "PAYMENT METHOD",
                x: 58,
                width: 250
              },
              {
                label: "TRANSACTIONS",
                x: 330,
                width: 80,
                align: "right"
              },
              {
                label: "AMOUNT",
                x: 425,
                width: 110,
                align: "right"
              }
            ],
            doc.y
          );


          doc.y += 29;


          payments.forEach(
            (item, index) => {

              if (
                doc.y + 30 >
                doc.page.height - 75
              ) {

                doc.addPage();

                doc.y = 70;

                sectionTitle(
                  "Payment Methods",
                  "Continued"
                );


                tableHeader(
                  [
                    {
                      label: "PAYMENT METHOD",
                      x: 58,
                      width: 250
                    },
                    {
                      label: "TRANSACTIONS",
                      x: 330,
                      width: 80,
                      align: "right"
                    },
                    {
                      label: "AMOUNT",
                      x: 425,
                      width: 110,
                      align: "right"
                    }
                  ],
                  doc.y
                );


                doc.y += 29;

              }


              const method =
                safeText(
                  item.method ||
                  item.payment_method ||
                  item.name,
                  "Unknown"
                );


              const amount =
                safeNumber(
                  item.amount ??
                  item.total
                );


              const transactionCount =
                safeNumber(
                  item.totalTransactions ??
                  item.total_transactions ??
                  item.count ??
                  0
                );


              tableRowBackground(
                doc.y,
                30,
                index
              );


              doc
                .font("Helvetica")
                .fontSize(8.5)
                .fillColor(COLORS.text)
                .text(
                  method,
                  58,
                  doc.y + 9,
                  {
                    width: 250,
                    ellipsis: true,
                    lineBreak: false
                  }
                );


              doc
                .font("Helvetica")
                .fontSize(8.5)
                .fillColor(COLORS.muted)
                .text(
                  String(
                    transactionCount
                  ),
                  330,
                  doc.y + 9,
                  {
                    width: 80,
                    align: "right",
                    lineBreak: false
                  }
                );


              doc
                .font("Helvetica-Bold")
                .fontSize(8.5)
                .fillColor(COLORS.dark)
                .text(
                  money(amount),
                  425,
                  doc.y + 9,
                  {
                    width: 110,
                    align: "right",
                    lineBreak: false
                  }
                );


              doc.y += 30;

            }
          );

        }

      }


      /* =====================================================
         FINAL SUMMARY CARD
      ===================================================== */

      ensureSpace(120);


      doc.moveDown(1);


      drawDivider();


      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(COLORS.dark)
        .text(
          "Report Summary"
        );


      doc.moveDown(0.5);


      drawBorderedBox(
        45,
        doc.y,
        505,
        78,
        COLORS.white
      );


      const summaryY =
        doc.y;


      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(
          "TOTAL INCOME",
          62,
          summaryY + 15
        );


      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.success)
        .text(
          money(totalIncome),
          62,
          summaryY + 32,
          {
            width: 130,
            lineBreak: false
          }
        );


      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(
          "TOTAL EXPENSE",
          215,
          summaryY + 15
        );


      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.danger)
        .text(
          money(totalExpense),
          215,
          summaryY + 32,
          {
            width: 130,
            lineBreak: false
          }
        );


      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(
          "CURRENT BALANCE",
          370,
          summaryY + 15
        );


      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(
          balance >= 0
            ? COLORS.primary
            : COLORS.danger
        )
        .text(
          money(balance),
          370,
          summaryY + 32,
          {
            width: 130,
            lineBreak: false
          }
        );


      doc.y =
        summaryY + 100;


      /* =====================================================
         CLOSING NOTE
      ===================================================== */

      ensureSpace(65);


      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(
          "This report is generated from the transaction data available in your Expense Tracker account. Values reflect the selected reporting period and available records.",
          45,
          doc.y,
          {
            width: 505,
            align: "left"
          }
        );


      doc.moveDown(0.7);


      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(COLORS.dark)
        .text(
          "Prepared by Rayan Ahmad",
          45,
          doc.y,
          {
            width: 505,
            align: "center"
          }
        );


      /* =====================================================
         FOOTERS + PAGE NUMBERS
      ===================================================== */

      const range =
        doc.bufferedPageRange();


      for (
        let i = 0;
        i < range.count;
        i++
      ) {

        doc.switchToPage(
          range.start + i
        );


        drawFooter();


        const footerY =
          doc.page.height - 42;


        doc
          .font("Helvetica")
          .fontSize(7.5)
          .fillColor(COLORS.muted)
          .text(
            `Page ${i + 1} of ${range.count}`,
            425,
            footerY,
            {
              width: 125,
              align: "right"
            }
          );

      }


      /* =====================================================
         FINISH PDF
      ===================================================== */

      doc.end();

    } catch (error) {

      console.error(
        "❌ PDF Generation Error:",
        error
      );

      reject(error);

    }

  });

};