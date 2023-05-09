const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Schema = mongoose.Schema;

const ComplainSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
      immutable: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title should be at least 5 characters long"],
      maxlength: [100, "Title should not exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content should be at least 10 characters long"],
      maxlength: [1000, "Content should not exceed 1000 characters"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Resolved"],
    },
    response: {
      type: String,
    },
  },
  { timestamps: true }
);

ComplainSchema.pre("save", async function (next) {
  const sender = await this.model("User").findById(this.user);
  if (!sender) {
    return next(
      new ErrorResponse(`User not found with id of ${this.user}`, 404)
    );
  }
  const receiver = await this.model("User").findById(this.receiverId);
  if (!receiver) {
    return next(
      new ErrorResponse(`User not found with id of ${this.receiverId}`, 404)
    );
  }
  next();
});

module.exports = mongoose.model("Complains", ComplainSchema);
