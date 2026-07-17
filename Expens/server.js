require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const path = require("path");

/* =========================================================
   CONFIG
========================================================= */

require("./config/db");
require("./config/passport");

/* =========================================================
   MIDDLEWARE
========================================================= */

const logger = require("./middleware/logger.middleware");

/* =========================================================
   ROUTES
========================================================= */

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const transactionRoutes = require("./routes/transaction.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const budgetRoutes = require("./routes/budget.routes");
const accountRoutes = require("./routes/account.routes");
const reportRoutes = require("./routes/report.routes");

/* =========================================================
   APP
========================================================= */

const app = express();

/* =========================================================
   SECURITY
========================================================= */

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(logger);

/* =========================================================
   STATIC FILES
========================================================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =========================================================
   API
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/reports", reportRoutes);

/* =========================================================
   404
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* =========================================================
   SERVER
========================================================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.clear();

  console.log("\n========================================");
  console.log("🚀 Expense Tracker API");
  console.log("========================================");
  console.log("✅ Database Connected");
  console.log(`📦 Database    : ${process.env.DB_NAME}`);
  console.log(
    `🌐 Environment : ${process.env.NODE_ENV || "development"}`
  );
  console.log("🔐 JWT Ready");
  console.log(
    `🚀 Server      : ${
      process.env.BACKEND_URL || `http://localhost:${PORT}`
    }`
  );
  console.log("========================================\n");
});