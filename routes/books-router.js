const express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const db = require('./db');
var user;
/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('show', { user: req.user });
});

router.get('/user', ensureLoggedIn, function(req, res, next) {
  res.send(req.user);
});

router.get('/list', (req, res) => {
	db.getAll((err, data) => {
		if (err) console.error(err);
		else res.send(JSON.stringify(data.Items));
	})
})

module.exports = router;
