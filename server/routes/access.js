const express = require('express');
const accessController = require('../controllers/accessController');
const router = express.Router();

router.post('/login',accessController.verifyUser, (req,res) => {
  return res.redirect('/mockdb.html');
});
	


router.post('/signup',accessController.createUser, (req,res) => {
  return res.redirect('/testlogin.html');
});


module.exports = router;