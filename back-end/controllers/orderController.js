const Order = require("../models/orderModel");
const factory = require("./handlerFactory");

exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
