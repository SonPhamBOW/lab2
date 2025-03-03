const express = require('express');
const { getAllAddress, getAddressById, createAddressById, updateAddressById, deleteAddressById } = require('../controllers/address.controller');
const router = express.Router()

// GET: /all - Get all addresses
router.get('/all', getAllAddress);

// GET: /all/:id - Get all addresses by id
router.get('/all/:id', getAddressById)

// PUT: / - Create new address by id
router.put('/:id', createAddressById)

// PUT: / - Update address by id
router.put('/update/:id/:addressId', updateAddressById)

// PUT: / - Delete address by id
router.put('/delete/:id/:addressId', deleteAddressById)
module.exports = router