'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const RouteSchema = new mongoose.Schema({
		parent_id: { type: String },
		url: { type: String },
		title: { type: String },
		remarks: { type: String },
		state: { type: Number, default: 1 }, // 1 启用 0 禁用
		hidden: { type: Number, default: 1 }, // 1 可以查询出来，0 无法查询到
		method: { type: String },
		create_time: { type: Date, default: Date.now() }
	});
	return mongoose.model('adminRoute', RouteSchema);
}