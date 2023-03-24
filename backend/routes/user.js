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
  uploadUserPhoto,
  getUserPhoto,
} = require("../controllers/user");
const { Auth, Authorize } = require("../middleware/auth");
const loginLimiter = require("../middleware/loginLimiter");
const router = express.Router();

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

router.post("/login", loginLimiter, LoginUser);
router.put("/updatePassword", Auth, updatePassword);
router.get("/logout", logoutUser);
router.get("/loginStatus", Auth, loginStatus);
router.post("/forgotpassword", Auth, forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get("/me", Auth, getMe);
router.get("/refereshToken", referesh);
router.put("/:id/image", Auth, upload.single("photo"), uploadUserPhoto);
router.get("/:id/image", Auth, getUserPhoto);
module.exports = router;
