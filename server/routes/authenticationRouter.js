const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');

router.post('/', authenticationController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUserInfo);
});

router.get('/', authenticationController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});
module.exports = router;
