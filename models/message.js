const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  added: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})


module.exports = mongoose.model('Message', MessageSchema)

