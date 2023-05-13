const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tags: {
    type: Object,
    default: {},
  },
  languages: {
    type: Object,
    default: {},
  },

  snippets: {
    type: [
      {
        type: Object,
        title: { type: String, required: true },
        comments: { type: String },
        storedCode: { type: String },

        tags: [String],
        language: { type: String },
      },
    ],
    default: [],
    lastSnippetId: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('User', userSchema);
