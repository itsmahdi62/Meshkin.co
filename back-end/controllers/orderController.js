const Product = require("../models/tourModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.getAllOrders = factory.getAll(Product);
exports.updateOrder = factory.updateOne(Product);
exports.deleteOrder = factory.deleteOne(Product)