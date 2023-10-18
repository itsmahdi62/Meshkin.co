const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes.js')
const dotenv  = require('dotenv')




dotenv.config({ path: './config.env'})

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

console.log(dotenv)


app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/user' , userRouter)

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})

