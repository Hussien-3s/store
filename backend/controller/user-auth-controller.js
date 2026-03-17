const Store = require('../models/schema-auth-controller')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const validator = require("email-validator");
var jwt = require('jsonwebtoken');
const Product = require('../models/schema-store-controller')

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const findUser = await Store.findOne({email:email})

  if (!findUser) {
    return res.status(401).json({ message: "Email or Password is incorrect" });
  }

  const comparePassword = await bcrypt.compare(password, findUser.password)

  if (!comparePassword) {
    return res.status(401).json({ message: "Email or Password is incorrect" });
  }

  const data = {id:findUser._id, email:findUser.email, phone:findUser.phone, name:findUser.name} 

  const token = await jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '7d' });

  res.status(200).json({message:"login Successfully", data:data, token:token})
})

const regstirUser = asyncHandler(async (req, res) => {
  const {email, password, name, phone} = req.body
  const findUser = await Store.findOne({email:email})
  const hashPassword = await bcrypt.hash(password, 10)
  const validat = await validator.validate(email);

  if (!validat) {
    return res.status(401).json({ message: "Enter the correct email address" });
  }

  if (findUser) {
    return res.status(401).json({ message: "The email is registered" });
  }

  const newUser = new Store({
      email:email,
      password:hashPassword,
      name:name,
      phone:phone
    });

    await newUser.save();
    res.status(200).json({ message: "Email created Successfully" })
})

const showStore = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userData = await Store.findById(decoded.id).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ 
      message: "Data fetched successfully",
      user: userData 
    });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, token } = req.body;
  const verfiy = await jwt.verify(token, process.env.SECRET_KEY);
  await Store.updateOne(
    { email: verfiy.email },
    { $push: { cart: { productId: productId } } }
  );

  res.send("save")
});

const deleteFromCart = asyncHandler(async (req, res) => {
  const { productId, token } = req.body;
  const verfiy = await jwt.verify(token, process.env.SECRET_KEY);
  await Store.updateOne(
    { email: verfiy.email },
    { $pull: { cart: { productId: productId } } }
  );

  res.send("save")
});

const deleteUser = asyncHandler(async (req, res) => {
  
})

const showCart = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.data?.email || decoded.email;
    const userStore = await Store.findOne({ email: email });

    if (!userStore || !userStore.cart || userStore.cart.length === 0) {
      return res.status(200).json([]);
    }

    const productIds = userStore.cart.map(item => item.productId);
    const products = await Product.find({ productId: { $in: productIds } });

    res.status(200).json(products);

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});

module.exports = {
  loginUser,
  regstirUser,
  deleteUser,
  showStore,
  addToCart,
  deleteFromCart,
  showCart
}