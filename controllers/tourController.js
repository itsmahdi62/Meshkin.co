// const fs = require('fs');
const Tour = require('../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
exports.getAllTours = async (req , res) => {
    try{
        //Build query
        // 1A) Filtering
        const queryObj = {...req.query};
        const excludedfields = ['page', 'sort' , 'limit' , 'fields']
        excludedfields.forEach(el => delete queryObj[el]) 
        // 1B advance filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}` )
        console.log(JSON.parse(queryStr))

        let query =  Tour.find(JSON.parse(queryStr)) 
        // 2) Sorting
        if(req.query.sort){
            query = query.sort(req.query.sort)
        }
        // Execute query
       const tours = await query
       // const tours = await Tour.find();
        //write query
        // const tours = await Tour.find({
        //     duration:5,
        //     difficulty : 'easy'
        // })
        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy')

       //Send responses
        res.status(200).json({
            status:'success',
            data:{
                tours : tours
            }
        })
        }catch(err){
            res.status(400).json({
                status:'unsuccessful',
                message: err ,
            }) 
            console.log(err)
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