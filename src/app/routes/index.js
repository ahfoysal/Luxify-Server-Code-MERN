const express = require('express')
const { ProductRoutes } = require('../modules/product/product.route')
const { CartRoutes } = require('../modules/cart/cart.route')

const router = express.Router()

const routes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

module.exports = router
