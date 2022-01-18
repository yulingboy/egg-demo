'use strict';
module.exports = app => {
	const mongoose = app.mongoose;
	const UserInfo = new mongoose.Schema({
		// 角色
		roles: {
			type:Array
		},
		username:String
	})
}