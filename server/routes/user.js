const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router =  express.Router();

router.post('/createUser', userController.findUser, userController.createUser, (req, res) => {
  return res.sendStatus(200);
});

router.post('/login', userController.verifyUser, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;