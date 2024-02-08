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
      required: [true, "A Product must have a duration"],
      enum: [1, 3, 6, 12],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    image: String,
    plan: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
