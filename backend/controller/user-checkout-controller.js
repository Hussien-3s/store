const Order = require('../models/schema-checkout-controller')
const Store = require('../models/schema-auth-controller')
const Product = require('../models/schema-store-controller')
const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');

const orderInfo = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const findUser = await Store.findOne({email:decoded.email})

  const productIds = findUser.cart.map(item => item.productId);
  const products = await Product.find({ productId: { $in: productIds } });
  const price = products.map((e) => {
    return e.price
  })
  const equalsPrice = price.reduce((a, c) => a + c, 0)

  const delivery = 80

  const total = equalsPrice + delivery 

  res.status(200).json({massage:"checkout", data:{price:total, delivery:delivery}})
})

const checkout = asyncHandler(async (req, res) => {
  const { email, code } = req.body
  const findUser = await Store.findOne({email:email})

  if (!findUser) {
    return res.status(401).json({massage:"email not found"})
  }

  if (findUser.cart.length === 0) {
    return res.status(404).json({massage:"cart is empty"})
  }

  const productIds = findUser.cart.map(item => item.productId);
  const products = await Product.find({ productId: { $in: productIds } });
  const price = products.map((e) => {
    return e.price
  })

  const equalsPrice = price.reduce((a, c) => a + c, 0)

  const newOrder = new Order({
      email:email,
      products:findUser.cart,
      price:equalsPrice,
      code:code
  });

  await Store.updateOne(
    { email: email },
    { cart: []}
  );

  await newOrder.save()

  res.status(200).json({massage:"order send successfully", data:equalsPrice})
})

const cartIsEmpty = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const findUser = await Store.findOne({email:decoded.email})

  if (!findUser) {
    return res.status(401).json({massage:"email not found"})
  }

  if (findUser.cart.length === 0) {
    return res.status(404).json({massage:"cart is empty"})
  }

  res.status(200).json({massage:"cart is not empty"})
})

module.exports = {
  checkout,
  orderInfo,
  cartIsEmpty
}