const User = require('../models/userModel.js');
const Snippet = require('../models/snippetModel.js');
const snippetsController = {};

//Error creator method specific to this controller
const createError = (method, log, status, message = log) => {
  return {
    log: `Error occurred in snippetsController.${method}: ${log}`,
    status,
    message: { err: message }
  };
};

//Retrieves all snippets associated with a user by looking up user (by ID) and referencing all snippets in the associated list
snippetsController.getSnippetsByUser = (req, res, next) => {
  const { userId } = req.query;
  //const userId = '645fee9104d1f0acef95a002';

  User.findById(userId)
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

//Creates snippet under Snippets collection
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

//Associates snippet with a particular user
snippetsController.saveSnippetToUser = (req, res, next) => {
  const { userId } = req.query;
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

//Updates snippet with provided properties
snippetsController.updateSnippet = (req, res, next) => {
  console.log(req.query);
  console.log(req.body);
  const { snippetId } = req.query;
  const { title, comments, storedCode, tags, language } = req.body;
  const updatedSnippet = { title, comments, storedCode, tags, language };

  for (const key in updatedSnippet) {
    if (!updatedSnippet[key]) {
      delete updatedSnippet[key];
    }
  }

  //Need to work out how best to update user tags, languages under this new approach

  Snippet.findByIdAndUpdate(
    snippetId,
    { ...updatedSnippet },
    { new: false, upsert: true }
  )
    .exec()
    .then((result) => {
      //Compare tags, languages in original and update to enable user refresh
      res.locals.updatedSnippet = result;
      let removedTags, addedTags, oldLang, newLang;

      if (result.tags !== tags || result.language !== language) {
        res.locals.changeFlag = true;
      }

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

//Deletes snippet with provided ID and removes from users with associated ID
snippetsController.deleteSnippet = (req, res, next) => {
  const { userId, snippetId } = req.query;
  Snippet.findByIdAndDelete(snippetId)
    .exec()
    .then((result) => {
      res.locals.deletedSnippet = result;
    })
    .then(() => {
      User.findById(userId)
        .exec()
        .then((user) => {
          user.snippets = user.snippets.filter((el) => el != snippetId);
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

snippetsController.recalcTagsAndLang = (req, res, next) => {
  if (!res.locals.changeFlag) {
    return next();
  }

  const { userId } = req.query;
  const tagList = new Set();
  const languageList = new Set();

  User.findById(userId)
    .populate('snippets')
    .exec()
    .then((user) => {
      user.snippets.forEach((snippet) => {
        snippet.tags.forEach((tag) => {
          if (!tagList.has(tag)) {
            tagList.add(tag);
          }
        });

        if (!languageList.has(snippet.language)) {
          languageList.add(snippet.language);
        }
      });

      user.tags = Array.from(tagList);
      user.languages = Array.from(languageList);
      user
        .save()
        .then((usr) => {
          res.locals.updatedUserRecord = usr;
          return next();
        })
        .catch((err) => {
          return next(
            createError(
              '.recalcTagsAndLang',
              `Error saving new tags, languages to user: ${err}`,
              500
            )
          );
        });
    })
    .catch((err) => {
      return next(
        createError(
          '.recalcTagsAndLanguages',
          `Error locating user for update: ${err}`,
          500
        )
      );
    });
};

module.exports = snippetsController;

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
