// const fs = require('fs');
const { query } = require('express');
const Tour = require('../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.aliasTopTours =  (req, res , next) => {
    req,query.limit ='5'
    req.query.sort = '-ratingAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

class APIfeatures{
    constructor(query , queryString){
        this.query = query ;
        this.queryString = queryString ;
    }

    filter(){
        const queryObj = {...this.query};
        const excludedfields = ['page', 'sort' , 'limit' , 'fields']
        excludedfields.forEach(el => delete queryObj[el]) 
        // 1B advance filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}` )
        // let query =  Tour.find(JSON.parse(queryStr)) 
        this.query = this.query.fint(JSON.parse(queryStr))
        return this
    }
    sort(){
        // 2) Sorting
        if(this.queryString.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            this.queryString = this.queryString.sort(sortBy)
        }else{
            this.queryString = this.queryString.sort('-createdAt')
        } return this
    }
    limitFields(){
        // 3) Field limiting 
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
           this.queryString =this.queryString.select((fields));
        }else{
           this.queryString =this.queryString.select('-__v');
        }
        return this
    }
    paginate(){
        const page  = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit * 1 || 100;
        const skip  = (page-1)* limit ; 
        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}


exports.getAllTours = async (req , res) => {
    try{
        //Build query
        // 1A) Filtering
        // const queryObj = {...req.query};
        // const excludedfields = ['page', 'sort' , 'limit' , 'fields']
        // excludedfields.forEach(el => delete queryObj[el]) 
        // // 1B advance filtering
        // let queryStr = JSON.stringify(queryObj)
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}` )

        // let query =  Tour.find(JSON.parse(queryStr)) 
        // // 2) Sorting
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy)
        // }else{
        //     query = query.sort('-createdAt')
        // }

        // 3) Field limiting 
        // if(req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select((fields));
        // }else{
        //     query = query.select('-__v');
        // }

        // 4) Pagination

        // const page = req.query.page * 1 || 1 ;
        //     const limit = req.query.limit * 1 || 100;
        //     const skip = (page-1)* limit ; 
        //     query = query.skip(skip).limit(limit)

        // if(req.query.page){
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw Error('This page doesnt exist')
        // }


        // Execute query
       const features = new APIfeatures(Tour.find() , req.query).filter().sort().limitFields().paginate()
        const tours = await features.query
       // const tours = await Tour.find();+
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