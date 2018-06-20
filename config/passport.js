const passport = require('passport');
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-id-token')
const User = require('../models/user');
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// finds or creates a new user in the database defined by user id from either facebook or google.

function findOneOrCreate(id, name, accessToken, done) {
  User.findOne({id: id}, function(err, user) {
    console.log("Round 2")
    if (err) { return done(err); }
    if (!user) {
      let newUser = new User ({
        _id: new mongoose.Types.ObjectId(),
        user: name,
        id: id,
        token: accessToken,
        favorites: []
      })
      newUser.save((err, user) => {
        console.log("New user created: " + name)
        if (err) { return done(err); }
        done(null, user);
      })
    } else {
      console.log("User found: " + name)
      done(null, user);
    }
  });
}

// passport authentication strategies using access tokens to authenticate users by their facebook 
// or google profile

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      const name = profile.name.givenName + " " + profile.name.familyName;
      findOneOrCreate(profile.id, name, accessToken, done);
    }
  )),

  passport.use(new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    passReqToCallback : true 
  },
  function(req, accessToken, googleId, done) {
    
    findOneOrCreate(googleId, req.body.name, req.body.id_token, done);
  }
))
}