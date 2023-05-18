const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/userModel.js');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const jwtStrategy = require('./jwt.config');


passport.use(jwtStrategy);
passport.use(new LocalStrategy({
  usernameField: 'username', // field name for username in req body
  passwordField: 'password', // field name for password in req body
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      // User not found
      return done(null, false, {message: 'Incorrect username or password'});
    }

    // unhash stored password with bcrypt and compare to input password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // incorrect password
      return done(null, false, {message: 'Incorrect username or password'});
    }

    // Auth successful, return the authenticated user
    return done(null, user);
  } catch (err) {
    // Error occured during the auth process
    return done(`Error occured during the auth process ${err}`);
  }
}
));

// Serialize the user object into a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user object from a session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
