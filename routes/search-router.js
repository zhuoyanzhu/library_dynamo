const express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const db = require('./db');
const WebSocket = require('ws');
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('search', { user: req.user });
});

router.post('/search', searchHandler);

function searchHandler(req, res) {
	if (req.body !== undefined) {
		let body = req.body;
		db.search(body, (err, data) => {
			if (err) console.error(err);
			else res.send(JSON.stringify(data.Items));
		})
	}
}
module.exports = router