const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    images: {
      type: [String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    shortDescription: {
      type: String,
    },

    ratings: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

const Product = model('Product', ProductSchema)
module.exports = Product
