const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes.js')


const app = express();
// middleware
app.use(express.json())

app.use((req,res,next) =>{
    console.log("The middleware");
    next()
})

app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/user' , userRouter)

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})