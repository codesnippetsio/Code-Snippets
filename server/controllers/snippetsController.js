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
//NOTE: WE SHOULD REALLY SEPARATE OUT STUFF LIKE THIS INTO A SEPARATE USER ROUTE AND USER CONTROLLER
snippetsController.getSnippetsByUser = (req, res, next) => {
  console.log('In get snippets...');
  const userId = req.user._id.toString();
  console.log('Logging ID...');
  console.log(userId);

  User.findById(userId)
    .populate('snippets')
    .exec()
    .then((user) => {
      res.locals.allSnippets = user.snippets;
      res.locals.userTagsLangs = { tags: user.tags, languages: user.languages };
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
  const userId = req.user._id.toString();
  User.findById(userId)
    .then((user) => {
      user.snippets.push(res.locals.newSnippet._id);
      user
        .save()
        .then((r) => {
          res.locals.updatedUserRecord = r;
          res.locals.changeFlag = true;
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
  const userId = req.user._id.toString();
  const { snippetId } = req.query;
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
              res.locals.changeFlag = true;
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

  const userId = req.user._id.toString();
  const tagList = new Set();
  const languageList = new Set();
  console.log(userId);
  User.findById(userId)
    .populate('snippets')
    .exec()
    .then((user) => {
      console.log(user);
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
