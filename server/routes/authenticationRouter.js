const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');

router.post('/', authenticationController.createUser, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
