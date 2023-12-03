const Cart = require('./cart.model')

const addToCart = async (uid, products) => {
  try {
    let existingCart = await Cart.findOne({ uid })

    if (existingCart) {
      products.forEach(newProduct => {
        const existingProductIndex = existingCart.products.findIndex(
          product =>
            product.product.toString() === newProduct.product.toString(),
        )

        if (existingProductIndex !== -1) {
          existingCart.products[existingProductIndex].quantity +=
            newProduct.quantity
        } else {
          existingCart.products.push(newProduct)
        }
      })

      await existingCart.save()
      return existingCart
    } else {
      const newCart = await Cart.create({ uid, products })
      return newCart
    }
  } catch (error) {
    console.error('Error creating/updating cart:', error)
    throw error
  }
}
const getSingleCart = async uid => {
  try {
    const result = await Cart.findOne({ uid }).populate('products.product')

    if (result && result.products && Array.isArray(result.products)) {
      // Filter out elements with null products
      result.products = result.products.filter(item => item.product !== null)
    }

    return result
  } catch (error) {
    console.error('Error getting single cart:', error)
    throw error
  }
}

const createOrUpdateCart = async (uid, products) => {
  try {
    // Find the existing cart by uid
    let existingCart = await Cart.findOne({ uid })

    // If cart exists, replace it with the new one
    if (existingCart) {
      existingCart.products = products
      await existingCart.save()
      return existingCart
    } else {
      // If cart doesn't exist, create a new one
      const newCart = await Cart.create({ uid, products })
      return newCart
    }
  } catch (error) {
    console.error('Error replacing cart:', error)
    throw error
  }
}
const removeFromCart = async (uid, productId) => {
  try {
    let existingCart = await Cart.findOne({ uid })

    if (!existingCart) {
      throw new Error('Cart not found')
    }

    const productIndex = existingCart.products.findIndex(
      product => product.product.toString() === productId.toString(),
    )

    if (productIndex !== -1) {
      existingCart.products.splice(productIndex, 1)
      await existingCart.save()
    }

    return existingCart
  } catch (error) {
    console.error('Error removing product from cart:', error)
    throw error
  }
}

const CartService = {
  createOrUpdateCart,
  getSingleCart,
  addToCart,
  removeFromCart,
}

module.exports = CartService
