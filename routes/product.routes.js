const express = require("express");
const {
  getAllProduct,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductsByName,
  getProductsByPrice,
} = require("../controllers/product.controller");

const router = express.Router();

// GET: / - Get all products
router.get("/", getAllProduct);

// GET: /:productId - Get product by Id
router.get("/:productId", getProductById);

// GET: /:productId - Get product by Id
router.get("/category/:categoryId", getProductsByCategoryId);

// POST: /create - Create new product
router.post("/create", createNewProduct);

// PUT: /update/:productId - update product
router.put("/update/:productId", updateProduct);

// DELETE: /delete/:productId - delete product
router.delete("/delete/:productId", deleteProduct);

// GET: /products/name/:name - Get product by name
router.get('/products/name/:name', getProductsByName);

// GET: /products/price?minPrice=10&maxPrice=50 - Get products by price range
router.get('/products/price', getProductsByPrice);

module.exports = router;
