const express = require('express');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();

router.get('/', snippetsController.placeHolder, (req, res) => res.status(200).send('hello'));

module.exports = router;