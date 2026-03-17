const asyncHandler = require('express-async-handler');
const Product = require('../models/schema-store-controller')
const { getRedisClient } = require('../config/redisClient')

const cacheStore = asyncHandler(async (req, res, next) => {
  const redis = await getRedisClient();
  const result = await redis.get('products');
  const products = await Product.find({})
  if (result == null) {
    await redis.setEx('products', 3600, JSON.stringify(products))
    return next()
  }

  res.json(JSON.parse(result))
})

module.exports = {
  cacheStore
} 