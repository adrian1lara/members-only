const mongoose = require('mongoose')
const { DateTime } = require('luxon')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  added: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})


MessageSchema.virtual('formatDate').get(function() {
  const formatDate = this.added.toLocaleString(DateTime.DATE_MED)
  return formatDate
})


module.exports = mongoose.model('Message', MessageSchema)

