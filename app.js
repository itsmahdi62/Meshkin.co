const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes.js')
const dotenv  = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env'})


mongoose.connect(process.env.DATABASE_LOCAL , {
    useNewUrlParser:true ,
    useCreateIndex :true ,
    useFindAndModify: false
}).then(() => {
    // console.log(con.connections);
    console.log('DB connection successful')
})

const tourSchema  =new mongoose.Schema({
    name : {
        type:String,
        required: [true , 'A tour must has a name !'],
        unique : true
    },
    rarting : {
        type : Number ,
        required : [ true , 'A tour must has a rating' ],
        default : 4.5
    } , 
    price:Number ,
})
const Tour = mongoose.model('Tour' , tourSchema);

const testTour =  new Tour({
    name : 'The forest hiker',
    rating: 4.7,
    price:497
})

testTour.save().then(doc =>{
    console.log(doc);
}).catch(err => console.log('Error 😘 '))


const app = express();
// middleware
app.use(express.json())
app.use(morgan('dev'))

app.use((req,res,next) =>{
    console.log("The middleware");
    next()
})
app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})
app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/user' , userRouter)

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})

