const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  cart: {
      type: [
        {
          productId: { type: String, required: true },
        }
      ],
      default: []
    }
})

const Store = mongoose.model('Stores', userSchema);

module.exports = Store
