//?var
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes/user-auth-route')
const cors = require('cors');
const routers = require('./routes/user-store-route')
const checkoutRouter = require('./routes/user-checkout-route')

//?middleware
app.use(cors());
app.use(express.json());
app.use(router)
app.use(routers)
app.use(checkoutRouter)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message
  });
});

//?contact
app.listen(process.env.PORT, () => {
  console.log('node run in 8080')
})

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('mongodb run')
})