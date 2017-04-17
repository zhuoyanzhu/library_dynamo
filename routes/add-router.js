const express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const db = require('./db');
const WebSocket = require('ws');

router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('add', { user: req.user });
});


router.post('/add', addHandler);

function addHandler(req, res) {
	if (req.body !== undefined) {
		let body = req.body;
		db.put(body, (err, data) => {
			if (err) {
				res.send('Something is wrong');
				console.error(err);
			} else {
				res.send('The book has been added successfully');
			}
			res.send('The book has been added successfully');
		})

	}
}

module.exports = router