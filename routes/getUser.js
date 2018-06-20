const express = require('express');
const passport = require('passport');
const app = express();
const jwt = require('../controllers/jwt');
const User = require('../models/user');

// Get the user and send the user data back to the client

app.get('/', jwt.authenticate, (req, res, next) => {
	console.log(req.body.favorites)
	User.findOne({id: req.auth.data.id}, (err, doc) => {
		console.log("Found: " + doc)
		res.send(doc)
	})
	
})

module.exports = app;