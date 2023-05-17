const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticationController = require('../controllers/authenticationController');

router.post('/signup', passport.authenticate('signup', {session:false}), authenticationController.signUp, (req, res) => {
  console.log('At signup router');
  res.status(200).json(res.locals.user);
});

router.post('/', authenticationController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUserInfo);
});

router.get('/', authenticationController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});
module.exports = router;
