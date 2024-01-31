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

exports.createOrderCheckout = (req , res ,next) =>{
    const {product , user , price} = req.query;
    if(!product && !user && !price) return next()
    
}