const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  sessionId: { type: String, required: true },
  createdAt: { type: Date, expires: 1209600, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
