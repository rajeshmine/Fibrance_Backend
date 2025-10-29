const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  category: String,
  subCategory: String,
  title: String,
  description: String,
  brand: String,
  price: Number,
  discount: {
    type: { type: String },
    value: Number
  },
  currency: String,
  images: [String],
  stock: {
    quantity: Number,
    status: String
  },
  ratings: {
    average: Number,
    count: Number
  },
  filters: mongoose.Schema.Types.Mixed,
  shippingDetails: {
    weight: String,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingOptions: [String]
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
