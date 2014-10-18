var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GroupSchema = require('../models/group');
var Group = mongoose.model('Group', GroupSchema, 'Group');
var UserSchema = require('../models/user');
var User = mongoose.model('User', UserSchema, 'User');

// POST /groups/add/:gid
//     adds the user to the group

router.post('/add/:gid', function(req, res /*, next*/) {
	Group.findById(req.params.gid, function(err, g) {
		if (err) res.send(err);
		else {
			g.members.push(req.user.fbid);
			g.save(function(err) {
				if(err) res.send(err);
				else res.json({ 'group' : g });
			});
		}
	});
	u = req.user;
	u.members.push(req.body.gid);
	u.save(function(err) {
		if(err) res.send(err);
		else res.json({ 'user' : u });
	});
	// next();
});

// SPECCCCCC
// GET /:group_id/
// requires: logged in & member of group
// gives info for group w/ group_id
// {
//     name: String
//     members: list of String ids
//     tasks: list of int ids
// }

router.get('/:id', function(req, res /*, next*/) {
	u = req.user;
	id = req.params.id;
	Group.findById(id, function (err, g) {
		if (err) res.send(err);
		else res.json({ 'group' : g });
	});
	// next();
});

// POST /groups/
// requires: logged in
// Form needed:
//     name: the name of the group
// makes group with given name

router.post('/', function(req, res /*, next*/) {
	console.log('asldkfjladksfg');
	grp = new Group();
	grp.name = req.body.name;
	grp.members.push(req.user.fbid);
	grp.save(function(err) {
		if(err) res.send(err);
		else res.send({ 'group' : grp });
	});
	u = req.user;
	u.members.push(grp.id);
	u.save(function(err) {
		if(err) res.send(err);
		else res.json({ 'user' : u });
	});
	// next();
});

router.get('/', function(req, res /*, next*/) {
	res.json({ 'groups' : req.user.groups });
	// next();
});



// POST /groups/group_id/task
// give me a form with
//     name: "do the dishes"
//     nextDue: Date (REQUIRES date in future)
//     recurrence: "DAILY"
// and i'll create a task in the given group and return a taskID


module.exports = router;
