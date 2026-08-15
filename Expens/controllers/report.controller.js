const { buildReport } = require("../helpers/report.helper");

const { generatePDF } = require("../utils/pdfReport");

const { generateExcel } = require("../utils/excelReport");


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

  } catch (error) {

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

exports.exportPdf = async (req, res) => {

  try {

    const report = await buildReport(
      req.user.id,
      req.query
    );

    const pdfBuffer = await generatePDF(
      report
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Expense_Report.pdf"'
    );

    res.setHeader(
      "Content-Length",
      pdfBuffer.length
    );

    return res.status(200).send(
      pdfBuffer
    );

  } catch (error) {

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

exports.exportExcel = async (req, res) => {

  try {

    const report = await buildReport(
      req.user.id,
      req.query
    );

    const excelBuffer = await generateExcel(
      report
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Expense_Report.xlsx"'
    );

    res.setHeader(
      "Content-Length",
      excelBuffer.length
    );

    return res.status(200).send(
      excelBuffer
    );

  } catch (error) {

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