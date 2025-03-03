// routes/categoryRoutes.js
const express = require('express');
const { getAllCategory, addCategory, updateCategoryById, getCategoryById, deleteCategoryById } = require('../controllers/category.controller');

const router = express.Router();

// GET: / Get all categories route 
router.get('/', getAllCategory);
// POST: /create Create a new Category 
router.post('/create', addCategory);
// PUT: /update Update a category
router.put('/update/:categoryId', updateCategoryById);
// GET: /categoryId Get A Category By Id
router.get('/:categoryId', getCategoryById);
// DELETE: /categoryId Delete a category by id
router.delete('/:categoryId', deleteCategoryById);

module.exports = router;