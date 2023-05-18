const express = require('express');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();

//NOTE: I'm muddying things here by returning tags and languages alongside snippets
//In the future, this should be refactored as a route to explicitly load all user data
//in the context of a separate user route and user controller

router.get('/', snippetsController.getSnippetsByUser, (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    snippets: res.locals.allSnippets,
    tagsLangs: res.locals.userTagsLangs
  });
});

router.post(
  '/',
  snippetsController.createSnippet,
  snippetsController.saveSnippetToUser,
  snippetsController.recalcTagsAndLang,
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
