const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount
} = require("../controllers/account.controller");

router.post("/", verifyToken, createAccount);
router.get("/", verifyToken, getAccounts);
router.get("/:id", verifyToken, getAccount);
router.put("/:id", verifyToken, updateAccount);
router.delete("/:id", verifyToken, deleteAccount);

module.exports = router;