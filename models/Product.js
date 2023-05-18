const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: String,
  title: String,
  category: String,
  description: String,
  price: Number,
}, { toJSON: { virtuals: true } });

productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Product', productSchema);