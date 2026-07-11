const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
  getBudgetStatus
} = require("../controllers/budget.controller");


router.post("/", verifyToken, createBudget);
router.get("/", verifyToken, getBudgets);
router.get("/status", verifyToken, getBudgetStatus);
router.get("/:id", verifyToken, getBudget);
router.put("/:id", verifyToken, updateBudget);
router.delete("/:id", verifyToken, deleteBudget);

module.exports = router;