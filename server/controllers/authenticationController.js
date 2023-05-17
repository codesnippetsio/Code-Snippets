const passport = require('../authConfig/passport.js');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const authenticationController = {};


//Error creator method specific to this controller
const createError = (method, log, status, message = log) => {
  return {
    log: `Error occurred in authenticationController.${method}: ${log}`,
    status,
    message: { err: message }
  };
};

//Authentication and user creation methods go here.
//Feel free to change these as you see fit -- I just have them in here for testing purposes.
authenticationController.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return next({
        log: 'Error occured in authenticationController.signUp',
        status: 400,
        message: 'Username already exists, please select another'
      });
    }

    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.locals.newUser = await newUser;
    return next();
  } catch (err) {
    return next(err);
  }
};

authenticationController.getUserData = (req, res, next) => {
  const { _id } = req.query;
  User.findById(_id)
    .exec()
    .then((user) => {
      res.locals.userData = user;
      return next();
    })
    .catch((err) => {
      return next(
        createError('getUserData', `Error retrieving user data: ${err}`, 500)
      );
    });
};


module.exports = authenticationController;
