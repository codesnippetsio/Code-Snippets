const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tags: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  snippets: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Snippet'
      }
    ],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
