const mongoose = require("mongoose");
const multer = require("multer");
const slugify = require("slugify");
const validator = require("validator");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Product must has a name !"],
      maxLength: [40, "A Product Name must have less or equal 40 charachter"],
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
    title: {
      type: String,
      required: [true, "A Product must has a title !"],
    },
    videos: {
      type: [String],
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
