const express = require('express');
const route = express.Router();
const {createNewOrder,getAllOrder,updateStatusOrder} = require('../controllers/order.controller');
const router = require('./customer.routes');
route.post('/create', createNewOrder)
route.get('/all',getAllOrder)
route.put('/updatestatus',updateStatusOrder)

module.exports = router;