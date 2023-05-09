const Complains = require("../models/complain");
const asyncHandler = require("../middleware/async");

//get all complain
const getComplains = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//create complain
const createComplain = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const complainRequest = await Complains.create(req.body);
  res.status(200).json("Sent");
});

//@desc       to update  Complain
//@routee     Put /complain
//@access     DRIVER/EMPLOYEE

const updateComplain = asyncHandler(async (req, res, next) => {
  delete req.body.user;

  let complainRequest = await Complains.findById(req.params.id);

  if (!complainRequest || complainRequest.isDeleted === true) {
    return next(
      new ErrorResponse(`Complains not found with id of ${req.params.id}`, 404)
    );
  }

  complainRequest = await Complains.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(complainRequest);
});

// const updateComplain = asyncHandler(async (req, res) => {
//   let complainRequest = await Complains.findById(req.params.id);

//   if (!complainRequest) {
//     return next(
//       new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
//     );
//   }
//   // //Make sure user is vehicle owner
//   // if (complainRequest.user.toString() !== req.user.id) {
//   //   return next(
//   //     new ErrorResponse(
//   //       `User ${req.params.id} is not authorized to update this vehicle`,
//   //       404
//   //     )
//   //   );
//   // }
//   complainRequest = await Complains.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json(complainRequest);
// });

//@desc       to Delete  Emergency Report
//@routee     DELETE /complain
//@access     DRIVER/EMPLOYEE
const deleteComplain = asyncHandler(async (req, res, next) => {
  let complain = await Complains.findById(req.params.id);
  if (!complain) {
    return next(
      new ErrorResponse(
        `Complain Report not found withs id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is Emergence Report owner!!
  if (complain.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Emergency Report`,
        404
      )
    );
  }
  complain.remove();
  res.status(200).json({ message: "Successfully Removed" });
});

module.exports = {
  getComplains,
  createComplain,
  updateComplain,
  deleteComplain,
};
