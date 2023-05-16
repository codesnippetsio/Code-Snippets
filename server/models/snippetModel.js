const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: { type: String, required: true },
  comments: { type: String },
  storedCode: { type: String },
  tags: [String],
  language: { type: String }
});

module.exports = mongoose.model('Snippet', snippetSchema);
