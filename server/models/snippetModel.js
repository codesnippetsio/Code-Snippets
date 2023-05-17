const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetsSchema = new Schema({
  username: {type: String},
  // id: { type: Number, required: true },
  // type: Object,
  title: { type: String, required: true },
  comments: { type: String },
  storedCode: { type: String },

  tags: [String],
  language: { type: String },

 

  lastId: { type: Number, default: 0 },

});


module.exports = mongoose.model('Snippet', snippetsSchema);