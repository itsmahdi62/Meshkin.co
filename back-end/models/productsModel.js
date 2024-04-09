const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Product must has a name !"],
      maxLength: [100, "A Product Name must have less or equal 100 charachter"],
      minLength: [3, "A Product Name must have more or equal 10 charachter"],
      // validate : [validator.isAlpha , 'Only use characters']
    },
    slug: String,
    duration: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    imageURL: String,
    about: String,
    instructor: String,
    totalVideo: Number,
    CourseContents: [String],
    videos: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
