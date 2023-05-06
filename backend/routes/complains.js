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
const router = express.Router();
router.use(Auth);

router.post("/", Authorize("ROLE_EMPLOYEE","ROLE_DRIVER"), advancedResult(User),createComplain);
router.get("/", getComplains);
router.put("/:id", updateComplain);
router.delete("/:id", deleteComplain);

module.exports = router;
