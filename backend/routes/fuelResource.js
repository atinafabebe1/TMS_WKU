const express = require("express");

const {
  updateResources,
  createResources,
  getresources,
} = require("../controllers/fuelResource");

const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const Resource = require("../models/fuelResources");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/", createResources);
router.get("/", advancedResult(Resource, ""), getresources);
router.put("/:id", updateResources);
module.exports = router;
