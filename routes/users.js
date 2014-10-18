var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('../models/user');
var User = mongoose.model('User', UserSchema, 'User');

// SPEC: /users/:user_id/
// 		returns user info in format
// 		{"user":{"_id":"54427d0f27d5e1000086d8ac","name":"Mallika Mathur","fbid":"10152402158866724","__v":0,"groups":[]}}

router.get('/:id', function(req, res) {
	console.log(req.params.id);
	User.findOne({ 'fbid': req.params.id }, function (err, u) {
		res.json({ 'user' : u });
	});
});



module.exports = router;
