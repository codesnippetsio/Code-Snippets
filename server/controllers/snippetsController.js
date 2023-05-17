const Snippet = require('../models/snippetModel.js');

const snippetsController = {};

snippetsController.getSnippets = (req, res, next) => {
  const { username } = req.params;
  console.log('req.params is:', req.params);

  Snippet.find({ username })
  
    .then((user) => {
      res.locals.allSnippets = user;
      console.log('res.locals.allSnippets is:', res.locals.allSnippets);
      return next();
    })
    .catch((err) => {
      console.log('Could not find user', err);
      next(err);
    });
};

snippetsController.createSnippet = async (req, res, next) => {
  const { username, title, comments, storedCode, tags, language } = req.body;
  if (!title) return next('error');
  const snippet = { username, title, comments, storedCode, tags, language };
  // const userId = '646502debb99b1a626e16436';
  try {
    const newSnippet = await Snippet.create(snippet);
    res.locals.createdSnippet = newSnippet;
    return next();
  }
  catch (err) {
    next(err);
  }
  
  // Snippet.findById(userId)
  //   .then((user) => {
  //     // Increment the lastId and assign it to the new snippet
  //     const newSnippetId = user.lastId + 1;
  //     user.lastId = newSnippetId;

  //     // Create the new snippet object with the assigned ID
  //     const newSnippet = {
  //       id: newSnippetId,
  //       ...snippet,
  //     };

  //     // Push the new snippet to the snippets array
  //     user.snippets.push(newSnippet);

  //     const [tags, languages] = recalcTagsAndLang(user);
  //     user.tags = tags;
  //     user.languages = languages;

  //     // Save the updated user document
  //     return user.save().then((updatedUser) => {
  //       res.locals.createdSnippet = newSnippet;
  //       next();
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Creating a snippet has failed:', error);
  //     next(error);
  //   });
};

snippetsController.updateSnippet = async (req, res, next) => {
  const { id, title, comments, storedCode, tags, language } = req.body;
  console.log('req.body: ', req.body);
  if (!title) return next('error');
  const updatedSnippet = { id, title, comments, storedCode, tags, language };
  const userId = '646502debb99b1a626e16436';
  
  try {
    await Snippet.findOneAndUpdate(
      { _id: id }, //filter by
      updatedSnippet,  // update
      {new: true}); // return new document
    return next();
  } catch(err) {
    return next(err);
  }
};

//   Snippet.findOneAndUpdate(
//     { _id: id, 'snippets.id': updatedSnippet.id },
//     {
//       $set: { 'snippets.$': updatedSnippet },
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

snippetsController.deleteSnippet = async (req, res, next) => {
  const { id } = req.body;
  if (!id) return next('error');

  try {
    await Snippet.findByIdAndDelete(id);
    return next();
  }
  catch(err) {
    console.log('Deleting the the snippet has failed:', err);
    return next(err);
  }
};

// snippetsController.deleteSnippet = (req, res, next) => {
//   const { id } = req.query;
//   if(!id) return next('error')
//   const userId = '646502debb99b1a626e16436';

//   Snippet.findOne({ _id: userId })
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
// const recalcTagsAndLang = function (user) {
//   const tagList = {};
//   const languageList = {};

//   for (const snippet of user.snippets) {
//     if (Array.isArray(snippet.tags)) {
//       for (const tag of snippet.tags) {
//         if (!tagList[tag]) {
//           tagList[tag] = [];
//         }
//         tagList[tag].push(snippet);
//       }

//       if (!languageList[snippet.language]) {
//         languageList[snippet.language] = [];
//       }
//       languageList[snippet.language].push(snippet);
//     }
//   }
//   //return something here.
//   return [tagList, languageList];
// };

module.exports = snippetsController;
