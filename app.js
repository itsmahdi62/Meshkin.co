const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes.js')
const mongoose = require('mongoose')
const dotenv  = require('dotenv')
dotenv.config({ path: './config.env'})

mongoose.connect(process.env.DATABASE_LOCAL , {
    useNewUrlParser:true ,
    useCreateIndex :true ,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(con => {
    // console.log(con.connections);
    // console.log('DB connection successful')
})



const app = express();
// middleware
app.use(express.json())
app.use(morgan('dev'))

app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/user' , userRouter)

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})
