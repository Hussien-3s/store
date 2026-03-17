const express = require('express')
const { showStore, addToStore, deleteFromStore, showCart } = require('../controller/user-store-controller')
const { cacheStore } = require('../middleware/cache-user-store')
const routers = express.Router()

routers.route('/addToStore').post(addToStore)
routers.route('/showStore').get(cacheStore, showStore)
routers.route('/deleteStore').delete(deleteFromStore)

module.exports = routers