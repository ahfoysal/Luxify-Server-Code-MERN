const sendResponse = require('../../../shared/sendResponse')
const httpStatus = require('http-status')
const catchAsync = require('../../../shared/catchAsync')
const CartService = require('./cart.service')

const createOrUpdateCart = catchAsync(async (req, res) => {
  const { uid, products } = req.body
  const result = await CartService.createOrUpdateCart(uid, products)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart modified successfully!',
    data: result,
  })
})

const addToCart = catchAsync(async (req, res) => {
  const { uid, products } = req.body
  const result = await CartService.addToCart(uid, products)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart added successfully!',
    data: result,
  })
})
const removeFromCart = catchAsync(async (req, res) => {
  const { uid, productId } = req.body
  const result = await CartService.removeFromCart(uid, productId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart added successfully!',
    data: result,
  })
})
const getSingleCart = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CartService.getSingleCart(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  })
})
const CartController = {
  createOrUpdateCart,
  getSingleCart,
  addToCart,
  removeFromCart,
}

module.exports = CartController
