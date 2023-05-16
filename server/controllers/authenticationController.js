const User = require('../models/userModel.js');
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
authenticationController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create(
    //Information goes here...
    { username, password }
  )
    .then((user) => {
      res.locals.newUserInfo = user;
      return next();
    })
    .catch((err) => {
      return next(
        createError(
          'createUser',
          `Error creating user with provided credentials: ${err}`,
          500
        )
      );
    });
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
