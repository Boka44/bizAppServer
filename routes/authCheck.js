const express = require('express');
const passport = require('passport');
const app = express();
const jwt = require('../controllers/jwt');
const User = require('../models/user');

// checks to make sure the current user is still logged in by using JWT middleware
// resets JWT expiration date so user can stay logged into a session if need be.

const getCurrentUser = function(req, res, next) {
	console.log(req.auth)
  User.findOne({id: req.auth.data.id}, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      console.log(user)
      next();
    }
  });
};

const getOne = function (req, res) {
  const user = req.user.toObject();

  delete user['__v'];

  res.json(user);
};

app.get('/', jwt.authenticate, getCurrentUser, getOne);

app.get('/test', (req, res) => {
	
	console.log(req.headers);
})
module.exports = app;