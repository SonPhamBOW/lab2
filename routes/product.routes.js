const express = require('express')
const { getAllProduct, createNewProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/product.controller')

const router = express.Router()

// GET: /all - Get all products
router.get('/all', getAllProduct)

// GET: /:id - Get product by Id
router.get('/:id', getProductById)

// POST: / - Create new product
router.post('/', createNewProduct)

// PUT: / - update product
router.put('/:id', updateProduct)

// DELETE: / - delete product
router.delete('/:id', deleteProduct)

module.exports = router
