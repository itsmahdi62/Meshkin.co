const fs = require('fs');
const Tour = require('../models/tourModel')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTour = (req , res) => {
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        // data: {
        //     tours
        // }
    })
} 
exports.createTour =  (req,res ) => {
        res.status(201).json({
            status:'success',
            // data:{
            //     tours : newTour  
            // }
        })
    
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