const mongoose = require("mongoose");
const multer = require("multer");
const slugify = require("slugify");
const validator = require("validator");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Product must has a name !"],
      unique: true,
      maxLength: [40, "A Product Name must have less or equal 40 charachter"],
      minLength: [10, "A Product Name must have more or equal 10 charachter"],
      // validate : [validator.isAlpha , 'Only use characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Product must have a duration"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    image: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
