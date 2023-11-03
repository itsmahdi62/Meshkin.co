const mongoose = require('mongoose')

const slugify = require('slugify')

const tourSchema  = new mongoose.Schema({
    name : {
        type:String,
        required: [true , 'A tour must has a name !'],
        unique : true
    },
    slug:String,
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

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7 ;
})

// DOCUMENT MIDDLEWARE : runs before .save() and .create() 
tourSchema.pre('save' , function(next){
    this.slug = slugify(this.name , { lower : true })
    next()
})

tourSchema.post('save' , function( doc , next ){
    console.log(doc)
    next()
})


const Tour = mongoose.model('Tour' , tourSchema);

module.exports  = Tour

