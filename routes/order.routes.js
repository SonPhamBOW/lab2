const express = require('express');
const route = express.Router();
const {createNewOrder,getAllOrder,updateStatusOrder} = require('../controllers/order.controller');
const router = require('./customer.routes');

// POST: / - Create new order
route.post('/create', createNewOrder)

// GET: / - Get all order of customer
route.get('/all',getAllOrder)

// PUT: / - Update status and status payment 
route.put('/updatestatus/:id',updateStatusOrder)

module.exports = router;