const mongoose = require('mongoose')

const tourSchema  = new mongoose.Schema({
    name : {
        type:String,
        required: [true , 'A tour must has a name !'],
        unique : true
    },
    duration : {
        type:Number ,
        required : [true ,  'A tour must have a duration']
    },
    maxGroupSize : {
        type : Number ,
        required : [true ,  'A tour must have a duration']
    },
    difficulty : {
        type:String,
        required : [true ,  'A tour must have a difficulty']
    },
    ratingsAverage : {
        type : Number ,
        default : 4.5
    } ,
    ratingsQuantity:{
        type : Number,
        default : 0,
    },
    price:{
        type:Number,
        required : [true , 'A tour must hava a price']
    } ,
    priceDiscount : 'number',
    summary : {
        type:String,
        trim:true,required:[true, 'A tour must have a summery']
    },
    description : {
        type:String,
        trim : true
    },
    imageCover: {
        type:String,
        required:[true, 'A tour must have a image']
    },
    image: [String],
    createdAt: {
        type : Date , 
        default : Date.now(),
        select:false
    },
    startDates:[Date]

})

const Tour = mongoose.model('Tour' , tourSchema);

module.exports  = Tour

