const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A tour must have reviews"],
    },
    rating: {
      type: Number,
      min:1 ,
      max:5
    },
    createdAt: {
      type: Date,
      default:Date.now(),
      required: true,
    },
    tours: {
        type : mongoose.Schema.ObjectId,
        ref: 'Tour',
        required : [true , 'Review must belong to a tour.']
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref: 'User',
        required : [true , 'Review must belong to a User.']
    }
  },
  {
    toJSON: {virtuals: true},
    toObject:{virtuals : true}
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
