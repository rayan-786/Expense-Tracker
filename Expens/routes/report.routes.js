const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {

  getReports,

  exportPdf,

  exportExcel

} = require("../controllers/report.controller");

/* =========================================================
   REPORTS
========================================================= */

router.get(

  "/",

  verifyToken,

  getReports

);

/* =========================================================
   EXPORT PDF
========================================================= */

router.get(

  "/export/pdf",

  verifyToken,

  exportPdf

);

/* =========================================================
   EXPORT EXCEL
========================================================= */

router.get(

  "/export/excel",

  verifyToken,

  exportExcel

);

module.exports = router;