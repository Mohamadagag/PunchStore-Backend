const mongoose = require("mongoose");
const Product = require("./product.model");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    appartment: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

orderSchema.pre(["find", "findOne"], function () {
  this.populate(["product"]);
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
