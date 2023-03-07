const crypto = require("crypto");
const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const driverInfoSchema = require("./driver");

const {
  ROLE_DIRECTOR,
  ROLE_DRIVER,
  ROLE_EMPLOYEE,
  ROLE_FUELDISTRUBTOR,
  ROLE_GARAGEDIRECTOR,
  ROLE_HEADOFDEPLOYMENT,
  ROLE_MECHANIC,
  ROLE_VICEPRESIDENT,
} = require("../constants/index");

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add Username"],
      unique: true,
      match:
        /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){3,28}(?:[A-Za-z0-9_]))?)$/,
      minlength: 3,
      maxlength: 28,
    },
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPassowrdExpire: Date,
    photo: {
      type: String,
    },
    twoFactorCode: {
      type: String,
    },
    twoFactorCodeExpire: {
      type: Date,
    },
    twoFactorEnable: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [
        ROLE_DIRECTOR,
        ROLE_DRIVER,
        ROLE_EMPLOYEE,
        ROLE_FUELDISTRUBTOR,
        ROLE_GARAGEDIRECTOR,
        ROLE_HEADOFDEPLOYMENT,
        ROLE_MECHANIC,
        ROLE_VICEPRESIDENT,
        "ROLE_ADMIN",
      ],
      default: ROLE_EMPLOYEE,
    },
    driverinfo: {
      type: driverInfoSchema,
      required: function () {
        return this.role === ROLE_DRIVER;
      },
    },
    refreshToken: [String],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Hashing Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcyrpt.hash(this.password, 11);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtAccessToken = function () {
  return jwt.sign(
    { id: this._id, Username: this.Username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
//Sign JWT and return
UserSchema.methods.getSignedJwtRefreshToken = function () {
  return jwt.sign(
    { Username: this.Username, id: this._id },
    process.env.REFERESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRE,
    }
  );
};

//Match use entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcyrpt.compare(enteredPassword, this.password);
};

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Set expire
  this.resetPassowrdExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
