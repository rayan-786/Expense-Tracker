const express = require("express");

const router = express.Router();

const {

  register,

  login,

  forgotPassword,

  resetPassword,

  profile

} = require("../controllers/auth.controller");

const verifyToken = require("../middleware/auth.middleware");

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/profile", verifyToken, profile);

module.exports = router;