(function() {
	var TaskSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	TaskSchema = new Schema({
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

	module.exports = mongoose.model('Task', TaskSchema);

}).call(this);
