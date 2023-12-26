// const fs = require('fs');
const Tour = require("../models/tourModel");
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 0.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        numRatings: { $sum: "$ratingsQuantity" },
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
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
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
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});

exports.getAllTours = factory.getAll(Tour);
exports.createTour = factory.createOne(Tour);
exports.getTour = factory.getOne(Tour, { path: "reviews" });
// Do not update passwords with this!
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
