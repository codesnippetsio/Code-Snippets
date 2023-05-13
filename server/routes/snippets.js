const express = require('express');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();

router.get('/', snippetsController.getSnippets, (req, res) =>
  res.status(200).json(res.locals.allSnippets)
);

router.post('/', snippetsController.createSnippet, (req, res) =>
  res.status(200).json(res.locals.createdSnippet)
);

router.put('/', snippetsController.updateSnippet, (req, res) =>
  res.status(200).json(res.locals.updatedSnippet)
);

router.delete('/:snippetId', snippetsController.deleteSnippet, (req, res) =>
  res.status(200).json(res.locals.deletedSnippet)
);

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
