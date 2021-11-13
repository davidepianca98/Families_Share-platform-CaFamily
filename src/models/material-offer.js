const mongoose = require('mongoose')

const materialOfferSchema = new mongoose.Schema({
  material_offer_id: {
    type: String,
    unique: true,
    required: true
  },
  material_name: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  borrowed: {
    type: Boolean,
    required: true,
    default: false
  },
  group_id: {
    type: String,
    required: true
  }
}, { timestamps: true, toJSON: { virtuals: true } })

materialOfferSchema.index({ group_id: 1, createdAt: -1 })

mongoose.pluralize(null)
const model = mongoose.model('MaterialOffer', materialOfferSchema)

module.exports = model
