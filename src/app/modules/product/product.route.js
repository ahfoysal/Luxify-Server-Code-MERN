const express = require('express')
const ProductController = require('./product.controller')

const router = express.Router()

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getSingleProduct)
router.patch('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

exports.ProductRoutes = router
