const Product = require("../models/tourModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const factory = require("./handlerFactory")

exports.getCkeckOutSession = catchAsync(async(req , res , next) =>{
    const product = await Product.findById(req.params.productId)

    res.status(200).json({
        status:'success',
        
    })
})
exports.getAllOrders = factory.getAll(Product);
exports.updateOrder = factory.updateOne(Product);
exports.deleteOrder = factory.deleteOne(Product)