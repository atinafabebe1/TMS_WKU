const ErrorResponse = require("../utils/errorResponse");
const asyncHanlder = require("../middleware/async");
const User = require("../models/user");
const VehicleRecord = require("../models/registerVehicle");
const validator = require("validator");

//@desc  Register User
//@route Post /user/register
//@access private/Admin
const registerUser = asyncHanlder(async (req, res, next) => {
  console.log(req.body);
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
  } else {
    console.log(req.body.driverinfo);
    // const vehicle = await VehicleRecord.findOne({
    //   plateNumber: req.body.driverinfo.plateNumber,
    // });
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

//get single user
const getUser = asyncHanlder(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

//@desc  Update User
//@route Patch /user/getusers/:id
//@access private/Admin
const updateUser = asyncHanlder(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);

  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User not found with ${req.params.id}`, 404));
  }

  try {
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

const removeUser = asyncHanlder(async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return next(new ErrorResponse("Please provide password", 400));
  }

  const user = await User.findOne({ _id: req.user.id }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //check if password matches
  const match = await user.matchPassword(password);

  if (!match) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  await User.findByIdAndUpdate(req.params.id, {
    isActive: req.body.isActive,
  });
  res.status(200).json({ message: "user removed" });
});

module.exports = {
  registerUser,
  updateUser,
  getUsers,
  removeUser,
  getUser,
};
