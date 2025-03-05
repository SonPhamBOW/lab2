// routes/categoryRoutes.js
const express = require('express');
const { getAllCategory, addCategory, updateCategoryById, getCategoryById, deleteCategoryById } = require('../controllers/category.controller');
const AccessTokenValidator = require("../middlewares/customervalidator.middlewares");

const router = express.Router();

// GET: / Get all categories route 
router.get('/', getAllCategory);
// POST: /create Create a new Category 
router.post('/create', AccessTokenValidator, addCategory);
// PUT: /update Update a category
router.put('/update/:categoryId', AccessTokenValidator, updateCategoryById);
// GET: /categoryId Get A Category By Id
router.get('/:categoryId', getCategoryById);
// DELETE: /categoryId Delete a category by id
router.delete('/:categoryId', AccessTokenValidator, deleteCategoryById);

module.exports = router;