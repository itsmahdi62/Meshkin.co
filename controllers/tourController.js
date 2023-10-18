const fs = require('fs');
const Tour = require('../models/tourModel');
const { error } = require('console');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTour = (req , res) => {
    // try{
    //     res.status(201).json({
    //         status:'success',
    //         data:{
    //             tours : tours    
    //         }
    //     })
    
    //    }catch{
    //         res.status(400).json({
    //             status:'unsuccessful',
    //             message: 'invalid data sent!' ,
    //         })
    //    }
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

   }catch{
        res.status(400).json({
            status:'unsuccessful',
            message: 'invalid data sent!' ,
        })
   }
}

exports.getTour =  (req , res) => {
    // const id = req.params.id * 1 ;
    // const tour = tours.find(el => el.id = id)  
    // if(id > tours.length){
    // if(!tour){
        // return res.status(404).json({status:'fail' , message : 'Invalid ID'})
    // }
    res.status(200).json({
        status : 'success',
        // data: {
        //     tours
        // }
    })
} 

exports.patchTour =  (req , res) =>{
    // if(req.param.id*1 > tours.length){
    //     // if(!tour){
    //         return res.status(404).json({status:'fail' , message : 'Invalid ID'})
    //     }
    res.status(200).json({
        status:'success',  
        // data:{
        //     tours : '<Updated here>'
        // }
    })
}
exports.deleteTour =  (req , res) =>{
    if(req.param.id*1 > tours.length){
        // if(!tour){
            return res.status(404).json({status:'fail' , message : 'Invalid ID'})
        }
    res.status(202).json({
        status:'success',
        // data:{
        //     tours : null
        // }
    })
}