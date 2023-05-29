const RegisterVehicle = require("../models/registerVehicle");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// @desc      Get all vehicle
// @route     GET /RegisteredVehicles
// @access    Private/Admin/HeadOfDeployment/Director/GeneralDirector
const getRegisteredVehicles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get all vehicle
// @route     GET /RegisteredVehicles
// @access    Private/Admin/HeadOfDeployment/Director/GeneralDirector
const getRegisteredVehicle = asyncHandler(async (req, res, next) => {
  const plateNumber = req.params.plateNumber;
  try {
    const vehicle = await RegisterVehicle.findOne({ plateNumber });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    console.log(vehicle);
    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// @desc      Create a vehicle record
// @route     Post /RegisteredVehicle
// @access    Private/HeadOfDeployment/
const registerVehicle = asyncHandler(async (req, res) => {
  await RegisterVehicle.create({
    ...req.body,
  });
  res.status(201).json({
    message: "Successfully Registered",
  });
});

// @desc      Update a vehicle record
// @route     Post /RegisteredVehicle/:id
// @access    Private/HeadOfDeployment/
const updateVehicleRecord = asyncHandler(async (req, res, next) => {
  let vehicle = await RegisterVehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  // if (vehicle.user.toString() !== req.user.id) {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this vehicle`,
  //       404
  //     )
  //   );
  // }

  vehicle = await RegisterVehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: "Successfully Updated" });
});

// @desc      Delete a vehicle record
// @route     Delete /RegisteredVehicle/:id
// @access    Private/HeadOfDeployment/
const deleteVehicle = asyncHandler(async (req, res, next) => {
  let vehicle = await RegisterVehicle.findOne({ _id: req.params.id });

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (vehicle.user.toString() !== req.user.id && req.user.role !== "admin") {
    // added role check for admin users to delete any vehicle
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this vehicle`,
        401
      )
    );
  }

  // set isDeleted flag to true
  vehicle.isDeleted = true;

  // save vehicle
  await vehicle.save();

  res.status(200).json({ message: "Removed Successfully" });
});
const uploadVehicleImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    console.log(req.file);
    const photo = req.file;
    const sizeLimit = 10 * 1024 * 1024; // 10 MB

    // Check if file is too large
    if (photo.length > sizeLimit) {
      throw new Error("File size too large");
    }

    const vehicle = await RegisterVehicle.findByIdAndUpdate(id, {
      "vehicleImage.title": title,
      "vehicleImage.photo": photo.filename,
      "vehicleImage.description": description,
    });
    console.log(vehicle);
    if (!vehicle) {
      console.log("vehicle not found");
    } else {
      console.log(vehicle);
    }
    const savedImage = vehicle.vehicleImage;

    // Return success response
    res.status(201).json({
      message: "Image uploaded successfully",
    });
  } catch (error) {
    // Log error and return error response
    console.error(`Error uploading image: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const getVehicleImage = async (req, res, next) => {
  const imagePath = path.join(__dirname, "../images", req.params.id);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read image file" });
    }

    res.setHeader("Content-Type", "image/jpeg"); // set the response content type
    res.send(data); // send the image data in the response
  });
};

module.exports = {
  registerVehicle,
  getRegisteredVehicles,
  updateVehicleRecord,
  deleteVehicle,
  uploadVehicleImage,
  getVehicleImage,
  getRegisteredVehicle,
};
