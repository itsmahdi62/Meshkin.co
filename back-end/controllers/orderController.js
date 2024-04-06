const Order = require("../models/orderModel");
const factory = require("./handlerFactory");
const Products = require("../models/productsModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

exports.getMyProducts = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  const Orders = await Order.findOne({ user: user._id });
  const result = Orders.products;
  console.log(result);
  res.status(200).json({ result });
});

exports.getMyProduct = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const product = await Products.findById(req.id).select("+videos");
  console.log(product);
  res.status(200).json({
    product,
  });
});
