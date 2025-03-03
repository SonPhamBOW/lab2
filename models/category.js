const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], 
        maxLength: [50, 'Name cant not be greater or equal than 50 chars'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'], 
        maxLength: [250, 'Description cant not be greater or equal than 250 chars'],
    } 
})

module.exports = mongoose.model("Category", categorySchema)