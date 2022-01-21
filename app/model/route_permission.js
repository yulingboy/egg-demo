'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const route_permission_schema = new mongoose.Schema({
		role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
		route_id: { type: mongoose.Schema.Types.ObjectId, ref: 'addminRoute' }
	});
	return mongoose.model('RoutePermission', route_permission_schema);
};