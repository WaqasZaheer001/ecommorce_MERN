const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }], // Assuming multiple images as an array of URLs
  size: { type: String },
  color: { type: String },
  brand: { type: String },
  availability: { type: Boolean, default: true }, // Indicates if the product is available in stock
  // Assuming a simple average rating for customer reviews
  averageRating: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  // Assuming shipping details to be an object containing information like weight, dimensions, etc.
  shippingDetails: {
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number }
    },
    // You can add more shipping details as needed
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
