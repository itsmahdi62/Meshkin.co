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

app.patch('/api/v1/tour/:id' , (req , res) =>{
    if(req.param.id*1 > tours.length){
        // if(!tour){
            return res.status(404).json({status:'fail' , message : 'Invalid ID'})
        }
    res.status(200).json({
        status:'success',  
        data:{
            tours : '<Updated here>'
        }
    })
})
app.delete('/api/v1/tour/:id' , (req , res) =>{
    if(req.param.id*1 > tours.length){
        // if(!tour){
            return res.status(404).json({status:'fail' , message : 'Invalid ID'})
        }
    res.status(202).json({
        status:'success',
        data:{
            tours : null
        }
    })
})


app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})