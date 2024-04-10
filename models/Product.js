const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [250, "Description can not be more than 250 characters"]
    },
    stored: {
        type: Number,
        required: [true, "Please add a stored quantity"],
        min: [0, "The minimum quantity that can be stored is 0"]
    }
});

module.exports = mongoose.model('Product', ProductSchema);