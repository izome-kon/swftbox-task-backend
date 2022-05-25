const mongoose = require('mongoose')
const shortId = require('shortid')
const shortLinkSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, 'shortLink must have a fullUrl.']
  },
  shortPath: {
    type: String,
    required: [true, 'shortLink must have a shortPath.'],
    default: shortId.generate
  },
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('shortLink', shortLinkSchema)