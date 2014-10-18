(function() {
	var GroupSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	GroupSchema = new Schema({
		id: Number,
		name: String,
		members: [Number],
		tasks: [Number]
	});

	module.exports = mongoose.module('Group', GroupSchema);

}).call(this);
