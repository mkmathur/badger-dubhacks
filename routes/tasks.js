var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TaskSchema = require('../models/task');
var Task = mongoose.model('Task', TaskSchema, 'Task');

// SPECKYSPECK
// GET /tasks/:task_id
// returns a task in the format
// {
//     "name" : "clean the kitchen",
//     "comments" : list of Strings
//     "nextDue" : Date (?)
//     "recurrence" : Number (??)
//     "owner" : user id
//     "potentialOwners" : list of user ids
// }
//
//

/*
router.get('/:id', function(req, res) {
	console.log(req.params.id);
	Task.findOne({ 'fbid': req.params.id }, function (err, u) {
		res.json({ 'user' : u });
	});
});
*/

module.exports = router;
