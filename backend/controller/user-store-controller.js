const Product = require('../models/schema-store-controller')
const asyncHandler = require('express-async-handler');

const showStore = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

const addToStore = asyncHandler(async (req, res) => {
  const {image, name, price} = req.body
  const products = await Product.find({})

  const id = await products.length + 1

  const newProduct = new Product({
    productId:id,
    image:image,
    name:name,
    price:price
  });

  await newProduct.save();
  res.status(200).json({ message: "Product saved", data:req.body})
})

const deleteFromStore = asyncHandler(async (req, res) => {
  
})

module.exports = {
  addToStore,
  deleteFromStore,
  showStore,
}
