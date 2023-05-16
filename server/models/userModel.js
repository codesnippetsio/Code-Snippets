const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tags: [String],
  languages: [String],
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
