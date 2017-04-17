const express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const db = require('./db');
const WebSocket = require('ws');

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('deal', { user: req.user });
});
router.post('/borrow', borrowHandler);

router.post('/return', returnHandler);

function returnHandler(req, res) {
	if (req.body !== undefined) {
		let body = req.body;
		db.get({ ID: body.ID }, (err, data) => {
			if (err) {
				res.send('Something is wrong');
				console.error(err);
			} else {
				if (data.hasOwnProperty('Item')) {
					if (body.borrower in data.Item.borrower) {
						newBorrower = data.Item.borrower;
						delete newBorrower[body.borrower];
						db.update({ ID: body.ID }, { borrower: newBorrower, num: data.Item.num + 1 }, (err) => {
							if (err) { res.send('Fail to update the record'); }
							else {
								let newData = data.Item;
								newData.borrower = newBorrower;
								newData.num = data.Item.num + 1;
								res.send('The book is returned');
							}
						});
					} else {
						res.send('Can not return this book');
					}
				} else {
					res.send('The library doesn\'t own this book');
				}
			}
		})

	}
}

function getCurrentDate() {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	let yyyy = today.getFullYear();	
	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	today = mm+'/'+dd+'/'+yyyy;
	return today;
}

function borrowHandler(req, res) {
	if (req.body != undefined) {
		let body = req.body;
		db.get({ ID: body.ID }, (err, data) => {
			if (err) {
				res.send('Something is wrong');
				console.error(err);
			} else {
				if (data.hasOwnProperty('Item')) {
					if (data.Item.num > 0) {
						if(!(body.borrower in data.Item.borrower)) {
							newBorrower = data.Item.borrower;
							newBorrower[body.borrower] = getCurrentDate();
							db.update({ ID: body.ID }, { borrower: newBorrower, num: data.Item.num - 1 }, (err) => {
								if (err) { res.send('Fail to update the record'); }
								else {
									// update admin page data
									let newData = data.Item;
									newData.borrower = newBorrower;
									newData.num = data.Item.num - 1;
									res.send(`Enjoy reading the <${data.Item.title}> book`);
								}
							});
						} else {
							res.send('You have borrowed this book before');
						}
					} else {
						res.send('The book is not available now, please try another book');
					}
				} else {
					res.send('Can\'t find the book');
				}
			}
		});
	}
}

module.exports = router