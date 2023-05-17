const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const authenticationController = require('../controllers/authenticationController');

require('dotenv').config();
const secret = process.env.JWT_SECRET;

router.post('/signup', authenticationController.signUp, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, secret, {
      expiresIn: '1d',
    });
    return res.status(202).json({ token });
  }
);

router.get('/', authenticationController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});
module.exports = router;
