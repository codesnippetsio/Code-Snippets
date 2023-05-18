const express = require('express');
const passport = require('passport');

const snippetsController = require('../controllers/snippetsController');

const router = express.Router();


// This Route is Secure
router.get('/', passport.authenticate('jwt', {session: false }), snippetsController.getSnippetsByUser, (req, res) =>{
  return res
    .status(200)
    .json(res.locals.allSnippets);
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
