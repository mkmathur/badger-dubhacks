var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// PASSPORT
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 1533343480240465,
    clientSecret: "7b3a7a55257dd4f8e9e36067b7d56ab1",
    callbackURL: "http://0.0.0.0:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	User.findOne({ 'fbid': profile.id }, function (err, user) {
		console.log('profile.id:'+profile.id);
		if(err) {
			done(err, profile);
		} else if(user) {
			console.log('user.fbid:'+user.fbid);
			done(null, user);
		} else {
			var u = new User();
			u.fbid = profile.id;
			u.name = profile.displayName;
			if(profile.emails != null && profile.emails.length > 0) {
				u.email = profile.emails.get(0).value;
			}
			console.log('u.fbid:'+u.fbid+'; name:'+u.name);
		    done(null, u);
		}
	});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.fbid);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ 'fbid': id }, function(err, user) {
    done(err, user);
  });
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/' }));

router.get('/success', function(req, res) {
	console.log('req.user:'+req.user);
});

module.exports = router;
