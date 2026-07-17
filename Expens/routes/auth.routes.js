const express = require("express");

const router = express.Router();
const passport = require("passport");

const {register, verifyOTP, login, forgotPassword, resetPassword, profile, updateProfile,  sendEmailOTP, updateEmail, changePassword, updateLanguage, deleteAccount, githubCallback} = require("../controllers/auth.controller");

const verifyToken = require("../middleware/auth.middleware");
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", verifyToken, profile);
router.put("/profile", verifyToken, updateProfile);
router.post("/send-email-otp", verifyToken,sendEmailOTP);
router.put("/update-email",verifyToken,updateEmail);
router.put("/change-password",verifyToken,changePassword);


router.put("/language",verifyToken,updateLanguage);
router.delete(
  "/delete-account",
  verifyToken,
  deleteAccount
);
router.get(
"/github",
passport.authenticate("github",{scope:["user:email"]})
);

router.get(
"/github/callback",

passport.authenticate("github",{

session:false

}),

githubCallback
);

module.exports = router;