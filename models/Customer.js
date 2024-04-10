const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  surname: {
    type: String,
    required: [true, "Please add a surname"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', schema);
