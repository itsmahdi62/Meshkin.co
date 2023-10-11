const express = require('express')
const fs = require('fs')

const app = express();

// middleware
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.get('/api/v1/tours' , (req , res) => {
    res.status(200).json({
        status : 'success',
        data: {
            tours
        }
    })
} )

app.post('/api/v1/tours', (req,res ) => {
    console.log(req.body)
    res.send('Done')
})

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})