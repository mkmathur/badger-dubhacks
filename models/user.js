(function() {
	var UserSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	UserSchema = new Schema({
		id: Number,
		name: String,
		phone: String,
		email: String,
		groups: [Number],
		prefs: {
			contactPhone: Boolean,
			contactEmail: Boolean
		}
	});

	module.exports = mongoose.module('User', UserSchema);

}).call(this);
