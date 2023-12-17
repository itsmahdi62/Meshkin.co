const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
exports.getOverview = async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) build template

  // 3)Render that template using tour data from
  res.status(200).render("overview", {
    title: "All Tours",
    tours
  });
};

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The forest hiker",
  });
};
