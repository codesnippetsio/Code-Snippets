const User = require('../models/userModel.js');
const Snippet = require('../models/snippetModel.js');
const snippetsController = {};

const createError = (method, log, status, message = log) => {
  return {
    log: `Error occurred in snippetsController.${method}: ${log}`,
    status,
    message: { err: message }
  };
};

snippetsController.getSnippetsByUser = (req, res, next) => {
  //const userId = req.body.userId;
  const userId = '645fee9104d1f0acef95a002';

  User.findOne({ _id: userId })
    .populate('snippets')
    .exec()
    .then((user) => {
      res.locals.allSnippets = user.snippets;
      return next();
    })
    .catch((err) => {
      console.log('Could not find user', err);
      next(err);
    });
};

snippetsController.createSnippet = (req, res, next) => {
  const { title, comments, storedCode, tags, language } = req.body;
  const snippet = { title, comments, storedCode, tags, language };
  Snippet.create(snippet)
    .then((doc) => {
      res.locals.newSnippet = doc;
      return next();
    })
    .catch((err) => {
      return next(
        createError('createSnippet', `Error creating new snippet: ${err}`, 500)
      );
    });
};

snippetsController.saveSnippetToUser = (req, res, next) => {
  const userId = req.body.userId;
  User.findById(userId)
    .then((user) => {
      user.snippets.push(res.locals.newSnippet._id);
      user
        .save()
        .then((r) => {
          res.locals.updatedUserRecord = r;
          return next();
        })
        .catch((err) => {
          return next(
            createError(
              'saveSnippetToUser',
              `Encountered error when saving new snippet to user: ${err}`,
              500
            )
          );
        });
    })
    .catch((err) => {
      return next(
        createError(
          'saveSnippetToUser',
          `Encountered error when retrieving user record: ${err}`,
          500
        )
      );
    });
};

// snippetsController.createSnippet = (req, res, next) => {
//   const { title, comments, storedCode, tags, language } = req.body;
//   const snippet = { title, comments, storedCode, tags, language };
//   const userId = '645fee9104d1f0acef95a002';

//   User.findById(userId)
//     .then((user) => {
//       // Increment the lastId and assign it to the new snippet
//       const newSnippetId = user.lastId + 1;
//       user.lastId = newSnippetId;

//       // Create the new snippet object with the assigned ID
//       const newSnippet = {
//         id: newSnippetId,
//         ...snippet
//       };

//       // Push the new snippet to the snippets array
//       user.snippets.push(newSnippet);

//       const [tags, languages] = recalcTagsAndLang(user);
//       user.tags = tags;
//       user.languages = languages;

//       // Save the updated user document
//       return user.save().then((updatedUser) => {
//         res.locals.createdSnippet = newSnippet;
//         next();
//       });
//     })
//     .catch((error) => {
//       console.error('Creating a snippet has failed:', error);
//       next(error);
//     });
// };

snippetsController.updateSnippet = (req, res, next) => {
  const { _id, title, comments, storedCode, tags, language } = req.body;
  const updatedSnippet = { title, comments, storedCode, tags, language };

  for (const key in updatedSnippet) {
    if (!updatedSnippet[key]) {
      delete updatedSnippet[key];
    }
  }

  //Need to work out how best to update user tags, languages under this new approach

  Snippet.findByIdAndUpdate(
    _id,
    { ...updatedSnippet },
    { new: true, upsert: true }
  )
    .exec()
    .then((result) => {
      res.locals.updatedSnippet = result;
      return next();
    })
    .catch((err) => {
      return next(
        createError(
          '.updateSnippet',
          `Encountered error while updating snippet: ${err}`,
          500
        )
      );
    });
};

// snippetsController.updateSnippet = (req, res, next) => {
//   const { id, title, comments, storedCode, tags, language } = req.body;
//   const updatedSnippet = { id, title, comments, storedCode, tags, language };
//   const userId = '645fee9104d1f0acef95a002';

//   User.findOneAndUpdate(
//     { _id: userId, 'snippets.id': updatedSnippet.id },
//     {
//       $set: { 'snippets.$': updatedSnippet }
//     },
//     { new: true }
//   )
//     .then((updatedUser) => {
//       const [tags, languages] = recalcTagsAndLang(updatedUser);
//       updatedUser.tags = tags;
//       updatedUser.languages = languages;
//       return updatedUser.save();
//     })
//     .then((savedUser) => {
//       res.locals.updatedSnippet = updatedSnippet;
//       next();
//     })
//     .catch((err) => {
//       console.log('Updating the snippet has failed:', err);
//       next(err);
//     });
// };

snippetsController.deleteSnippet = (req, res, next) => {
  const { uid, sid } = req.query;
  Snippet.findByIdAndDelete(sid)
    .exec()
    .then((result) => {
      res.locals.deletedSnippet = result;
    })
    .then(() => {
      User.findById(uid)
        .exec()
        .then((user) => {
          user.snippets = user.snippets.filter((el) => el != uid);
          user
            .save()
            .then((updatedUser) => {
              res.locals.updatedUserRecord = updatedUser;
              return next();
            })
            .catch((err) => {
              return next(
                createError(
                  'deleteSnippet',
                  `Encountered error while saving updated user snippets list: ${err}`,
                  500
                )
              );
            });
        })
        .catch((err) => {
          return next(
            createError(
              'deleteSnippet',
              `Encountered error while retrieving user with provided ID: ${err}`,
              500
            )
          );
        });
    })
    .catch((err) => {
      return next(
        createError(
          'deleteSnippet',
          `Encountered error while attempting to delete snippet with provided ID: ${err}`,
          500
        )
      );
    });
};

// snippetsController.deleteSnippet = (req, res, next) => {
//   const { id } = req.query;
//   const userId = '645fee9104d1f0acef95a002';

//   User.findOne({ _id: userId })
//     .then((user) => {
//       const deletedSnippet = user.snippets.find((snippet) => {
//         return `${snippet.id}` === id;
//       });

//       // Remove the snippet from the user's snippets array
//       user.snippets = user.snippets.filter((snippet) => `${snippet.id}` !== id);

//       //recalculate the tags and languages.
//       const [tags, languages] = recalcTagsAndLang(user);
//       user.tags = tags;
//       user.languages = languages;

//       // Save the updated user document
//       return user.save().then(() => {
//         res.locals.deletedSnippet = deletedSnippet;
//         next();
//       });
//     })
//     .catch((error) => {
//       console.error('Error deleting snippet:', error);
//       next(error);
//     });
// };
// helper function to re-calculate taglist/language counts?
//Not using this at present...
const recalcTagsAndLang = function (user) {
  const tagList = {};
  const languageList = {};

  for (const snippet of user.snippets) {
    if (Array.isArray(snippet.tags)) {
      for (const tag of snippet.tags) {
        if (!tagList[tag]) {
          tagList[tag] = [];
        }
        tagList[tag].push(snippet);
      }

      if (!languageList[snippet.language]) {
        languageList[snippet.language] = [];
      }
      languageList[snippet.language].push(snippet);
    }
  }
  //return something here.
  return [tagList, languageList];
};

module.exports = snippetsController;
