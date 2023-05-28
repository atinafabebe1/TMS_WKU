const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "Fuel",
        "Benzene",
        "Petrol",
        "Kerosene",
        "Biodiesel",
        "Diesel",
        "Fren Oil",
        "Gear oil",
        "Grease",
      ],
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

// ResourceSchema.statics.createOrUpdate = async function (resource) {
//   try {
//     const existingResource = await this.findOne({ type: resource.type });
//     if (existingResource) {
//       existingResource.amount += resource.amount;
//       return existingResource.save();
//     } else {
//       return this.create(resource);
//     }
//   } catch (error) {
//     throw new ErrorResponse("Error creating or updating resource.", 500);
//   }
// };

module.exports = mongoose.model("Resource", ResourceSchema);
