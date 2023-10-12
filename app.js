const express = require('express')
const fs = require('fs')

const app = express();

// middleware
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.get('/api/v1/tours/:id' , (req , res) => {

    const id = req.params.id * 1 ;
    const tour = tours.find(el => el.id = id)  
    if(id > tours.length){
    // if(!tour){
        return res.status(404).json({status:'fail' , message : 'Invalid ID'})
    }



    res.status(200).json({
        status : 'success',
        data: {
            tours
        }
    })
} )

app.post('/api/v1/tours', (req,res ) => {
    // console.log(req.body)

    const newId = tours[tours.length - 1].id + 1
    const newTour  = Object.assign({id:newId} , req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours) ,err =>{
        res.status(201).json({
            status:'success',
            data:{
                tours : newTour  
            }
        })
    })
})

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})