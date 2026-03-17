const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  productId: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product
