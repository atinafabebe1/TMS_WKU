const express = require("express");

const {
  getSpareParts,
  createSparePart,
  updateSparePart,
  deleteSparePart,
} = require("../controllers/sparePartRequest");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const SparePartRequest = require("../models/sparePartRequest");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/sparePart", createSparePart);
router.get("/sparePart/", advancedResult(SparePartRequest, ""), getSpareParts);
router.put("/sparePart/:id", updateSparePart);
router.delete("/sparePart/:id", deleteSparePart);
router.patch("/sparePart/backup/:id", backupDeletedDocument(SparePartRequest));

module.exports = router;
