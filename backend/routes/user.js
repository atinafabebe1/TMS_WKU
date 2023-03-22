const express = require("express");
const {
  LoginUser,
  logoutUser,
  loginStatus,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  referesh,
} = require("../controllers/user");
const { Auth, Authorize } = require("../middleware/auth");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");

router.post("/login", loginLimiter, LoginUser);
router.patch("/updatePassword", Auth, updatePassword);
router.get("/logout", logoutUser);
router.get("/loginStatus", Auth, loginStatus);
router.post("/forgotpassword", Auth, forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get("/me", Auth, getMe);
router.get("/refereshToken", referesh);
module.exports = router;
