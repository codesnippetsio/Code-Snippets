const User = require('../models/userModel');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  // const 
}

userController.findUser = async (req, res, next) => {
  console.log('In userController.findUser!!!');
  console.log('findUSer req.body', req.body)
  const { username } = req.body;

  try {
    const result = await User.findOne({username: username}); 
    console.log('result in User.findUser ', result);
    if (result !== null) { // if username is taken
      return next({
        log: 'error in in findUser',
        status: 400,
        message: 'Username already taken'
      });
    } else {
      return next();
    }
  } catch(err) {
    return next(err);
  }
};

userController.createUser = async (req, res, next) => {
  const {username, password} = req.body;
    
  try {
    const result = await User.create({ username: username, password: password});
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;