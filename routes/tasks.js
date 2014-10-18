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

router.get('/:id', function(req, res) {
	Task.findById(req.params.id, function(err, t) {
		if(err) res.send(err);
		else res.json({ 'task' : g });
	});
});

// POST /:task_id/comment

router.post('/:id/comment', function(req, res) {
	Task.findById(req.params.id, function(err, t) {
		if(err) res.send(err);
		else {
			t.comments.push([req.user.fbid, req.body.comment]);
			t.save(function(err2) {
				if(err) res.send(err);
				else res.json({ 'task' : t });
			});
		}
	});
});

// POST /:task_id/:user_id
//
// POST /:task_id/complete

module.exports = router;
