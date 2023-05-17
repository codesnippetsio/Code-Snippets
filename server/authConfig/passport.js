const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function authenticate(passport) {
  console.log('Passport Authenticate called');
};