const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: String, required: true }
})

UserSchema.virtual('fullname').get(function() {
  return `${this.name} ${this.lastname}`
})

UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)
