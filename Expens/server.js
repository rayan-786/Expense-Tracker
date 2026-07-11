require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
require("./config/db");
const logger = require("./middleware/logger.middleware");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const transactionRoutes = require("./routes/transaction.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const budgetRoutes = require("./routes/budget.routes");
const accountRoutes = require("./routes/account.routes");
const reportRoutes = require("./routes/report.routes");


const app = express();

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());
app.use(express.json());
app.use(logger);

/* =========================================================
   ROUTES
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API Running"
  });
});

app.use(

  "/uploads",

  express.static(

    path.join(__dirname, "uploads")

  )

);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/reports", reportRoutes);

/* =========================================================
   SERVER
========================================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.clear();

  console.log("\n========================================");
  console.log("🚀 Expense Tracker API");
  console.log("========================================");
  console.log("✅ Database Connected");
  console.log(`📦 Database    : ${process.env.DB_NAME}`);
  console.log(`🌐 Environment : ${process.env.NODE_ENV || "development"}`);
  console.log("🔐 JWT Ready");
  console.log(`🚀 Server      : http://localhost:${PORT}`);
  console.log("========================================\n");

});