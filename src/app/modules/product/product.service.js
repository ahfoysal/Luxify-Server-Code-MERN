const paginationHelper = require('../../../helpers/paginationHelper')
const { productsSearchableFields } = require('./product.constant')
const Product = require('./product.model')

const createProduct = async product => {
  // Create the product
  const newProduct = await Product.create(product)

  return newProduct
}

const getAllProducts = async (filters, pagination) => {
  const { searchTerm, ...filterData } = filters
  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: productsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination)

  const sortConditions = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Product.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Product.count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const updateProduct = async (id, payload) => {
  console.log(payload)
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}
const getSingleProduct = async id => {
  const result = await Product.findById(id)
  return result
}
const deleteProduct = async id => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

const ProductService = {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
}

module.exports = ProductService
