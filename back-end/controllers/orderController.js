const Order = require("../models/orderModel");
const factory = require("./handlerFactory");
const Products = require("../models/productModel");
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Order.create({ tour, user, price });
});

exports.getMyProducts = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const Orders = await Order.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const productIDs = Orders.map((el) => el.products);
  const products = await Products.find({ _id: { $in: productIDs } });

  res.status(200).json({
    title: "My products",
    products,
  });
});
