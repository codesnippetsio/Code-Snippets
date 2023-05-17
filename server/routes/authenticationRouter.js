const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticationController = require('../controllers/authenticationController');

router.post('/signup', authenticationController.signUp, (req, res) => {
  res.status(201).json(res.locals.newUser);
});

router.get('/', authenticationController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});
module.exports = router;
