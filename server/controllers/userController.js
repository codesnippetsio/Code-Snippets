const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

const userController = {};



userController.verifyUser = async (req, res, next) => {
  const {username, password} = req.body;
  try {
    const result = await User.findOne({username: username});
    const comparison = await bcrypt.compare(password, result.password);
    if (comparison === true) return next();
    if (result.password === password) return next();
    return next({
      log: 'user inputted incorrect password',
      status: 401,
      message: 'Incorrect username or password'});
  } catch (err) {
    return next({
      log: `error in userController.verifyUser: ${err}`,
      status: 400,
      message: 'error verifying user'
    });
  }
};

userController.findUser = async (req, res, next) => {
  // console.log('In userController.findUser!!!');
  // console.log('findUSer req.body', req.body);
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

    
// try {
//   const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR)
//   this.password = hash;
//   return next();
// }
// catch (err) {
//   return next(err);
// }
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('password is:', password);
    const result = await User.create({ username: username, password: password});
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;