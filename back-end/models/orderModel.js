const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: [true, "Ordering must belong to a user ."],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
      // required: [true, "Ordering must belong to a user ."],
    },
  ],
});

orderSchema.pre(/^find/, function (next) {
  this.populate("user").populate("products");
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
