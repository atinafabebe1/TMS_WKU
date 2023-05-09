const express = require("express");

const {
  getComplains,
  createComplain,
  updateComplain,
  deleteComplain,
} = require("../controllers/complain");
const advancedResult = require("../middleware/advancedResult");
const User = require("../models/user");
const { Auth, Authorize } = require("../middleware/auth");
const { ROLE_EMPLOYEE } = require("../constants");
const Complains = require("../models/complain");
const router = express.Router();
router.use(Auth);

router.post("/", createComplain);
router.get("/", advancedResult(Complains, ""), getComplains);
router.put("/:id", updateComplain);
router.delete("/:id", deleteComplain);

module.exports = router;
