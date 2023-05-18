const express = require('express');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();

router.get('/', snippetsController.getSnippetsByUser, (req, res) =>
  res.status(200).json(res.locals.allSnippets)
);

router.post(
  '/',
  snippetsController.createSnippet,
  snippetsController.saveSnippetToUser,
  (req, res) => res.status(200).json(res.locals.newSnippet)
);

router.put(
  '/',
  snippetsController.updateSnippet,
  snippetsController.recalcTagsAndLang,
  (req, res) =>
    res.status(200).json({
      snippet: res.locals.updatedSnippet,
      userData: res.locals.updatedUserRecord
    })
);

router.delete(
  '/',
  snippetsController.deleteSnippet,
  snippetsController.recalcTagsAndLang,
  (req, res) =>
    res.status(200).json({
      snippet: res.locals.deletedSnippet,
      userData: res.locals.updatedUserRecord
    })
);

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
