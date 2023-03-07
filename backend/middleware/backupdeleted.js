const asyncHandler = require("./async");

const backupDeletedDocument = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new ErrorResponse(`Document not found`, 404));
    }

    document.isDeleted = false;

    await document.save();

    return res
      .status(200)
      .json({ message: "Document Recovered successfully", dat: document });
  });

module.exports = backupDeletedDocument;
