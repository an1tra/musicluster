//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var db = require("../models");
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      },
      include: ['Albums']
    }).then(function(dbUser) {
      console.log(dbUser)
      dbUser["Albums"].forEach(x => console.log(x.name));
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//NEW CODE
var LastFMStrategy = require('passport-lastfm')
var _ = require('lodash');
var cb_url = 'http://localhost:3000';

passport.use(new LastFMStrategy({
  'api_key': process.env.LASTFM_KEY,
  'secret': process.env.LASTFM_SECRET,
  'callbackURL': cb_url + '/auth/lastfm/callback'
}, function(req, sessionKey, done) {
  // Find/Update user's lastfm session

  // If user logged in
  if (req.user){
    User.findById(req.user.id, (err, user) => {
      if (err) return done(err);

      var creds = _.find(req.user.tokens, {type:'lastfm'});
      // if creds already present
      if (user.lastfm && creds){
        req.flash('info', {msg:'Account already linked'});

        return done(err, user, {msg:'Account already linked'})
      }

      else{
        user.tokens.push({type:'lastfm', username:sessionKey.username, key:sessionKey.key });
        user.lastfm = sessionKey.key;

        user.save(function(err){
          if (err) return done(err);
          req.flash('success', {msg:"Last.fm authentication success"});
          return done(err, user, sessionKey);
        });
      }
    });
  }
  else{
    return done(null, false, {message:'Must be logged in'});
  }
}));
// NEW CODE
//
// Exporting our configured passport
module.exports = passport;





