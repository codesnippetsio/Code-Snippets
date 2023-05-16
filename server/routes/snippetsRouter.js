const express = require('express');
const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

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

router.put('/', snippetsController.updateSnippet, (req, res) =>
  res.status(200).json(res.locals.updatedSnippet)
);

router.delete('/', snippetsController.deleteSnippet, (req, res) =>
  res.status(200).json(res.locals.deletedSnippet)
);

router.use((req, res) => res.status(404).send('Invalid endpoint'));

module.exports = router;
