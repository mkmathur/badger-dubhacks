(function() {
	var UserSchema, Schema, mongoose;
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

	UserSchema = new Schema({
		fbid: String,
		name: String,
		phone: String,
		email: String,
		groups: [Number],
		prefs: {
			contactPhone: Boolean,
			contactEmail: Boolean
		}
	});

	module.exports = mongoose.model('User', UserSchema);

}).call(this);
