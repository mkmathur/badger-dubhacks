var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('../models/user');
var User = mongoose.model('User', UserSchema, 'User');

// SPEC: /users/:user_id/
// 		returns user info in format
// 		{
// 			name:
// 			phone:
// 			email:
// 			groups:
// 			preferences:
// 		}

router.get('/:id', function(req, res) {
	console.log(req.params.id);
	User.findOne({ 'fbid': req.params.id }, function (err, u) {
		res.json({ 'user' : u });
	});
});

module.exports = router;
