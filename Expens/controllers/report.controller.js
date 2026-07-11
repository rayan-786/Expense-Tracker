const db = require("../config/db");

const fs = require("fs");

const { buildReport } = require("../helpers/report.helper");

const { generatePdf } = require("../utils/pdfReport");

const { generateExcel } = require("../utils/excelReport");

const {

  generateCharts,

  cleanupCharts

} = require("../utils/chartGenerator");

/* =========================================================
   GET REPORTS
========================================================= */

exports.getReports = async (req, res) => {

  try {

    const report = await buildReport(

      req.user.id,

      req.query

    );

    return res.status(200).json({

      success: true,

      message: "Report generated successfully.",

      data: report

    });

  }

  catch (error) {

    console.error("\n❌ Get Reports Error");

    console.error("----------------------------------------");

    console.error(error);

    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

/* =========================================================
   EXPORT PDF
========================================================= */

/* =========================================================
   EXPORT PDF
========================================================= */

exports.exportPdf = async (req, res) => {

  let filePath = null;
  let charts = null;

  try {

    const report = await buildReport(
      req.user.id,
      req.query
    );

    charts = await generateCharts(report);

    filePath = await generatePdf(
      report,
      charts
    );

    return res.download(

      filePath,

      "Expense_Report.pdf",

      (err) => {

        if (err) {

          console.error(
            "PDF Download Error:",
            err
          );

        }

        if (
          charts
        ) {

          cleanupCharts(charts);

        }

        if (
          filePath &&
          fs.existsSync(filePath)
        ) {

          fs.unlinkSync(filePath);

        }

      }

    );

  }

  catch (error) {

    if (charts) {

      cleanupCharts(charts);

    }

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {

      fs.unlinkSync(filePath);

    }

    console.error("\n❌ Export PDF Error");
    console.error("----------------------------------------");
    console.error(error);
    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Unable to export PDF."

    });

  }

};

/* =========================================================
   EXPORT EXCEL
========================================================= */

/* =========================================================
   EXPORT EXCEL
========================================================= */

exports.exportExcel = async (req, res) => {

  let filePath = null;

  try {

    const report = await buildReport(
      req.user.id,
      req.query
    );

    filePath = await generateExcel(
      report
    );

    return res.download(

      filePath,

      "Expense_Report.xlsx",

      (err) => {

        if (err) {

          console.error(
            "Excel Download Error:",
            err
          );

        }

        if (
          filePath &&
          fs.existsSync(filePath)
        ) {

          fs.unlinkSync(filePath);

        }

      }

    );

  }

  catch (error) {

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {

      fs.unlinkSync(filePath);

    }

    console.error("\n❌ Export Excel Error");
    console.error("----------------------------------------");
    console.error(error);
    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Unable to export Excel."

    });

  }

};