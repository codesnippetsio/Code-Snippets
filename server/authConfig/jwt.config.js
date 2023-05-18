const passport = require('passport');
const User = require('../models/userModel.js');

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// load env variables
require('dotenv').config();
const secret = process.env.JWT_SECRET;  

console.log('outside passport jwt config');
// Passport JWT config
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

// new JWT strategy
const jwtStrategy = new JwtStrategy(options,
  async (payload, done) => {
    console.log('JwtStrat called', options);
    try{
      // find user based on JWT payload
      const user = await User.findById(payload.userId);
      console.log('payload', payload);
      console.log('payload.userId', payload.userId);
      if (user) {
        
        // if user is found, return user
        return done(null, user);
      } else {
        // if user is not found, return false
        return done(null, false);
        // or create a new account
      }
    } catch (err) {
      // if error occurs pass to done callback
      return done(err);
    }
  }
);

module.exports = jwtStrategy;