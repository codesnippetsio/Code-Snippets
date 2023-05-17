const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieContoller');

const router =  express.Router();

router.post('/createUser', userController.findUser, userController.createUser, (req, res) => {
  return res.sendStatus(200);
});

router.post('/login', userController.verifyUser, cookieController.setCookie, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;