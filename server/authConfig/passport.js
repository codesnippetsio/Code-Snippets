const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return done(null, false, {message: 'Email already exists'})
          }

          // password encryption
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password,salt);

          const newUser =  User.create({
            username: req.body.username,
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};