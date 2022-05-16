const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    homeTitle: {
      type: String,
      trim: true,
    },
    homeDescription: {
      type: String,
      trim: true,
    },
    flag: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
