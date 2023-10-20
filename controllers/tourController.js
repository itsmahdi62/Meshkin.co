// const fs = require('fs');
const Tour = require('../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
exports.getAllTours = async (req , res) => {
    try{
        const tours = await Tour.find()
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours : tours
            }
        })
       }catch(err){
            res.status(400).json({
                status:'unsuccessful',
                message: 'invalid data sent!' ,
            })
       }
} 

exports.createTour = async (req,res ) => {
    // const newTour = new Tour({})
    // newTour.save()
   try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            tours : newTour  
        }
    })
   }catch(error){
        res.status(400).json({
            status:'unsuccessful',
            message: error
        })
   }
}

exports.getTour =async  (req , res) => {
    try{
        const tour =await Tour.findById(req.params.id)
        res.status(201).json({
            status:'success',
            data:{
                tour  
            }
        })
       }catch{
            res.status(400).json({
                status:'unsuccessful',
                message: 'invalid data sent!' ,
            })
       }
} 

exports.patchTour = async (req , res) =>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id , req.body , {
            new:true
        })

        res.status(201).json({
            status:'success',
            data:{
                tour: '<Updated Tour >'
            }
        })
       }catch{
            res.status(400).json({
                status:'unsuccessful',
                message: 'invalid data sent!' ,
            })
       }
}
exports.deleteTour =async  (req , res) =>{
    try{
        const tour =await Tour.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status:'success',
            data:{
                tour  
            }
        })
       }catch{
            res.status(400).json({
                status:'unsuccessful',
                message: 'invalid data sent!' ,
            })
       }
}