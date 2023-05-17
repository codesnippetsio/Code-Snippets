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

});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

userSchema.pre('save', function (next) {
  const hash =  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    console.log('hashed password:', this.password);
    return next();
  });
});

module.exports = mongoose.model('User', userSchema);
