const mongoose = require('mongoose')

const tourSchema  = new mongoose.Schema({
    name : {
        type:String,
        required: [true , 'A tour must has a name !'],
        unique : true
    },
    rating : {
        type : Number ,
        required : [ true , 'A tour must has a rating' ],
        default : 4.5
    } , 
    price:Number ,
})

const Tour = mongoose.model('Tour' , tourSchema);

module.exports  = Tour

