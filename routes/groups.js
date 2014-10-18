var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GroupSchema = require('../models/group');
var Group = mongoose.model('Group', GroupSchema, 'Group');

// SPECCCCCC
// GET /:group_id/
// requires: logged in & member of group
// gives info for group w/ group_id
// {
//     name: String
//     members: list of String ids
//     tasks: list of int ids
// }
// POST /groups/
// requires: logged in
// Form needed:
//     name: the name of the group
// makes group with given name
//
// POST /groups/group_id/task
// give me a form with
//     name: "do the dishes"
//     nextDue: Date (REQUIRES date in future)
//     recurrence: "DAILY"
// and i'll create a task in the given group and return a taskID

/*
router.get('/:id', function(req, res) {
	console.log(req.params.id);
	Group.findOne({ 'fbid': req.params.id }, function (err, u) {
		res.json({ 'user' : u });
	});
});
*/

module.exports = router;
