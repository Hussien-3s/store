const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  products:{type:Object, required: true},
  price:{type: Number, required:true},
  code:{type:String, default:""}
})

const Order = mongoose.model('Order', userSchema);

module.exports = Order