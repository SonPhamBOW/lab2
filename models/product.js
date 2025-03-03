const mongoose = require('mongoose')
const Category = require('./category')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], 
        maxLength: [50, 'Name cant not be greater or equal than 50 chars'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'], 
        min: 0,
        max: 100
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'], 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: [true, 'Category is required']
    }
})

module.exports = mongoose.model("Product", productSchema)