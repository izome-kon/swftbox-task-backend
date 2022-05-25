const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
})
module.exports = mongoose.model('Visitor', visitorSchema)