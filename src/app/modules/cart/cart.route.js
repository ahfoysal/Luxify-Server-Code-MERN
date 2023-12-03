const express = require('express')
const CartController = require('./cart.controller')

const router = express.Router()

router.post('/', CartController.createOrUpdateCart)
router.post('/add', CartController.addToCart)
router.post('/remove', CartController.removeFromCart)
router.get('/:id', CartController.getSingleCart)

exports.CartRoutes = router
