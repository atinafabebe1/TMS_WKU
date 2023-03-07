const express = require("express");
const { registerUser, getUsers, updateUser } = require("../controllers/admin");
const { Auth, Authorize } = require("../middleware/auth");
const advancedResult = require("../middleware/advancedResult");
const User = require("../models/user");
const router = express.Router();
// router.use(Auth);
// router.use(Authorize("ROLE_ADMIN"));

router.get("/getusers", advancedResult(User), getUsers);
router.post("/register", registerUser);
router.put("/:id", updateUser);

module.exports = router;
