const express = require('express');
const passport = require('passport');
const app = express();
const jwt = require('../controllers/jwt');
const User = require('../models/user');

app.post('/', jwt.authenticate, (req, res, next) => {
	console.log(req.body.favorites)
	User.findOneAndUpdate({id: req.auth.data.id}, {$set:{favorites: req.body.favorites}}, {new: true}, (err, doc) => {
		console.log("Updated: " + doc)
	})
})

module.exports = app;