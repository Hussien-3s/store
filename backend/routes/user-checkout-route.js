const express = require('express')
const { checkout, orderInfo, cartIsEmpty } = require('../controller/user-checkout-controller')
const checkoutRouter = express.Router()

checkoutRouter.route('/checkout').post(checkout)
checkoutRouter.route('/checkout-info').get(orderInfo)
checkoutRouter.route('/cart-is-empty').get(cartIsEmpty)

module.exports = checkoutRouter