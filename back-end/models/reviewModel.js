const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a User."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  console.log(tourId);
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    // {
    //   $group: {
    //     _id: "$tour",
    //     nRating: { $sum: 1 },
    //     avgRating: { $avg: "$rating" },
    //   },
    // },
  ]);
  console.log(stats);
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
