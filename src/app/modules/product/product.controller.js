const sendResponse = require('../../../shared/sendResponse')
const httpStatus = require('http-status')
const catchAsync = require('../../../shared/catchAsync')
const paginationFields = require('../../constants/pagination')
const pick = require('../../../shared/pick')
const ProductService = require('./product.service')
const { productFilterableFields } = require('./product.constant')

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product created successfully!',
    data: result,
  })
})
const getAllProducts = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters = pick(req.query, productFilterableFields)
  const result = await ProductService.getAllProducts(filters, paginationOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductService.getSingleProduct(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product retrieved successfully',
    data: result,
  })
})
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await ProductService.updateProduct(id, updatedData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product updated successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductService.deleteProduct(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product deleted successfully',
    data: result,
  })
})
const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}

module.exports = ProductController
