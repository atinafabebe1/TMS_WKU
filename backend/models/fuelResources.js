const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Coupon", "Fuel", "Cash"],
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ResourceSchema.statics.createOrUpdate = async function (resource) {
  const existingResource = await this.findOne({ type: resource.type });
  if (existingResource) {
    existingResource.amount += resource.amount;
    return existingResource.save();
  } else {
    return this.create(resource);
  }
};

module.exports = mongoose.model("Resource", ResourceSchema);
