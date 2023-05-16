const User = require('../models/userModel.js');
const authenticationController = {};

//Authentication and user creation methods go here
authenticationController.createUser = (req, res, next) => {
  const { uid, password } = req.query;
  User
    .create //Information goes here...
    ();
};

module.exports = authenticationController;
