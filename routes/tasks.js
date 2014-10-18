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
// add comment to task, return task

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
// add user to potentialOwners of task

router.post('/:tid/:uid', function(req, res) {
	Task.findById(req.params.tid, function(err, t) {
		if (err) res.send(err);
		else {
			if(t.owners.indexOf(req.params.uid) == -1) {
				t.owners.push(req.params.uid);
				t.save(function(err) {
					if(err) res.send(err);
					else res.json({ 'task' : t});
				});
			}
		}
	});
});

// POST /:task_id/complete
// mark task complete--or reset due date & owner

router.post('/:tid/complete', function(req, res) {
	Task.findById(req.params.tid, function(err, t) {
		if(err) res.send(err);
		else {
			if(t.schedule == 0) {	// non-repeating
				t.complete = true;
			} else {				// repeating
				t.dueDate.setDate(t.dueDate.getDate()+t.schedule);
				t.owner = t.owners.get(t.owners.indexOf(t.owner)+1);
			}
			t.save(function(err) {
				if(err) res.send(err);
				else res.json({ 'task' : t });
			});
		}
	});
});

module.exports = router;
