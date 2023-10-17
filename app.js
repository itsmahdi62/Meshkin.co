const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const app = express();
dotenv.config({path: './config.env'})
// const DB = process.env.DATABASE.replace('<PASSWORD>' ,process.env.DATABASE_PASSWORD)

// mongoose.connect(DB , {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
// }).then(con => {
//     console.log(con.connections);
//     console.log('DB connection seuccessful!')
// })


// middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} 
app.use(express.json())

app.use((req,res,next) =>{
    console.log("The middleware");
    next()
})

app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/user' , userRouter)


console.log(process.env)


app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})