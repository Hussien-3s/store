const express = require('express')
const { loginUser, regstirUser, deleteUser, showStore, addToCart, showCart, deleteFromCart } = require('../controller/user-auth-controller')
const router = express.Router()

router.route('/regstir').post(regstirUser)
router.route('/login').post(loginUser)
router.route('/store').get(showStore)
router.route('/delete').delete(deleteUser)
router.route('/addToCart').patch(addToCart)
router.route('/deleteFromCart').patch(deleteFromCart)
router.route('/showCart').get(showCart)

module.exports = router