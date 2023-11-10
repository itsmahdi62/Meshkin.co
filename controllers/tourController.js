// const fs = require('fs');
const Tour = require('../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
const APIfeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
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
  const features = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;
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
    status: 'success',
    data: {
      tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()

  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tours: newTour,
    },
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if(!tour){
    return next(new AppError('No tour found with that id' , 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.patchTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 0.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        numRatings: { $sum: '$ratingsQuantity' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //     $match : { _id: { $ne: 'EASY'} }
    // }
  ]);
  res.status(201).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
