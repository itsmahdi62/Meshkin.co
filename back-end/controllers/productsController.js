const Products = require("../models/productsModel");
const AppError = require("../utils/appError");
const cathcAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllProducts = factory.getAll(Products);
exports.createProduct = factory.createOne(Products);
exports.getProduct = factory.getOne(Products);
exports.updateProduct = factory.updateOne(Products);
exports.deleteProduct = factory.deleteOne(Products);
