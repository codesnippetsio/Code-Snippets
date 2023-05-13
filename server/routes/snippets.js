const express = require('express');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();

router.get('/', snippetsController.getSnippets, (req, res) => res.status(200).json({}));

router.put('/', snippetsController.createSnippet, (req, res) => res.status(200).json({}));

router.post('/', snippetsController.updateSnippet, (req, res) => res.status(200).json({}));

router.delete('/', snippetsController.deleteSnippet, (req, res) => res.status(200).json({}));

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;