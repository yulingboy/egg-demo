'use strict';
module.exports = app => {
	const mongoose = app.mongoose;
	const RoleSchema = new mongoose.Schema({
		title: { type: String, unique: true, required: true },
		name: { type: String, required: true, default: 'user' },
		create_time: { type: Date, default: Date.now }
	});
	return mongoose.model('Role', RoleSchema);
  }