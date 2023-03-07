const ErrorResponse = require("../utils/errorResponse");
const asyncHanlder = require("../middleware/async");
const User = require("../models/user");
const validator = require("validator");

//@desc  Register User
//@route Post /user/register
//@access private/Admin
const registerUser = asyncHanlder(async (req, res, next) => {
  if (!validator.isStrongPassword(req.body.password)) {
    return next(new ErrorResponse("Weak Password", 400));
  }
  const dupicate = await User.findOne({ userName: req.body.userName });

  if (dupicate) {
    return next(new ErrorResponse("Duplicate User", 409));
  }
  //deletes the unwanted subfield document if the role is not match
  if (req.body.role !== "ROLE_DRIVER") {
    req.body.driverinfo = undefined;
  }

  const user = await User.create(req.body);

  // const token = user.getSignedJwtToken();
  res.status(201).json({ message: "Successfully Registered" });
});

//@desc  Get all User
//@route GET /user/getusers
//@access private/Admin
const getUsers = asyncHanlder(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc  Update User
//@route Patch /user/getusers/:id
//@access private/Admin
const updateUser = asyncHanlder(async (req, res, next) => {
  if (req.body.role) {
    return next(new ErrorResponse("Role cannot be changed", 401));
  }
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User not found with ${req.params.id}`, 404));
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  updateUser,
  getUsers,
};
