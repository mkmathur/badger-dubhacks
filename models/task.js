(function() {
	var TaskSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	TaskSchema = new Schema({
		id: Number,
		name: String,
		owner: Number,
		owners: [Number],
		dueDate: Date,
		schedule: Number,
		comments: [{
			user: Number,
			comment: String
		}]
	});

	module.exports = mongoose.module('Task', TaskSchema);

}).call(this);
