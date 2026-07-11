const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transaction.controller");

router.post("/", verifyToken, upload.single("receipt"), createTransaction);
router.get("/", verifyToken, getTransactions);
router.get("/:id", verifyToken, getTransaction);
router.put("/:id", verifyToken, updateTransaction);
router.delete("/:id", verifyToken, deleteTransaction);
router.post("/", verifyToken, upload.single("receipt"), createTransaction);
router.put("/:id", verifyToken, upload.single("receipt"), updateTransaction);
module.exports = router;