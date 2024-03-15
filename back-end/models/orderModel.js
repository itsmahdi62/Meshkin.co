const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Ordering must belong to a user ."],
  },
  products: {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
      required: [true, "Ordering must belong to a user ."],
    },
  price: {
    type: Number,
    require: [true, "Order must have a price ."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "products",
    select: "name",
  });
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
