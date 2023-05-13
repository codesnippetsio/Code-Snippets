const User = require('../models/userModel.js');

const snippetsController = {};

snippetsController.getSnippets = (req, res, next) => {
  const userId = '645fee9104d1f0acef95a002';

  User.findOne({ _id: userId })
    .then((user) => {
      res.locals.allSnippets = user.snippets;
      return next();
    })
    .catch((err) => {
      console.log("Couldn't find snippets", err);
      next(err);
    });
};

snippetsController.createSnippet = (req, res, next) => {
  const { snippet } = req.body;
  const userId = '645fee9104d1f0acef95a002';

  User.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        snippets: snippet,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.locals.createdSnippet = snippet;
      return next();
    })
    .catch((err) => {
      console.log('Creating a snippet has failed', error);
      next(err);
    });
};

snippetsController.updateSnippet = (req, res, next) => {
  const { updatedSnippet } = req.body;
  const userId = '645fee9104d1f0acef95a002';

  User.findOneAndUpdate(
    { _id: userId, 'snippets._id': updatedSnippet._id },
    {
      $set: { 'snippets.$': updatedSnippet },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.locals.updatedSnippet = updatedSnippet;
      return next();
    })
    .catch((err) => {
      console.log('Updating the snippet has failed:', error);
      next(err);
    });
  return next();
};

snippetsController.deleteSnippet = (req, res, next) => {
  const { snippetId } = req.params;
  const userId = '645fee9104d1f0acef95a002';

  User.findOne({ _id: userId })
    .then((user) => {
      const deletedSnippet = user.snippets.find(
        (snippet) => snippet._id.toString() === snippetId
      );

      // Remove the snippet from the user's snippets array
      user.snippets = user.snippets.filter(
        (snippet) => snippet._id.toString() !== snippetId
      );

      // Save the updated user document
      return user.save().then(() => {
        res.locals.deletedSnippet = deletedSnippet;
        next();
      });
    })
    .catch((error) => {
      console.error('Error deleting snippet:', error);
      next(error);
    });
};

// helper function to re-calculate taglist/language counts?
const recalcTagsAndLang = function (user) {
  let tagList = {};
  let languageList = {};

  for (const snippet of user.snippets) {
    for (const tag of snippet.tags) {
      if (!tagList[tag]) {
        tagList[tag] = 1;
      } else {
        tagList[tag] += 1;
      }

      if (!languageList[snippet.language]) {
        languageList[snippet.language] = 1;
      } else {
        languageList[snippet.language] += 1;
      }
    }
  }

  //return something here.
};

module.exports = snippetsController;
