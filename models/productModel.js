//modules
const mongoose = require("mongoose");
const Manufacturer = require("./manufacturerModels");

// SCHEMA MONGOOSE
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  rating: {
    type: Number,
  },
  img: {
    type: String,
    required: [true, "A product must have an image"],
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Manufacturer,
  },
});

// MONGOOSE MODEL
module.exports = mongoose.model("Product", productSchema);
