const passport = require('passport');
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook-token');
const User = require('../models/user');
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
console.log(FACEBOOK_APP_ID)

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('Working')
      const name = profile.name.givenName + " " + profile.name.familyName;
      console.log(name)
      User.findOne({id: profile.id}, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          let newUser = new User ({
            _id: new mongoose.Types.ObjectId(),
            user: name,
            id: profile.id,
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
  ));
}