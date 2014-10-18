(function() {
	var TaskSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	TaskSchema = new Schema({
		name: String,
		owner: String,
		owners: [String],
		dueDate: Date,
		schedule: Number,
		comments: [{
			user: String,
			comment: String
		}],
		complete: Boolean
	});

	module.exports = mongoose.model('Task', TaskSchema);

}).call(this);
