'use strict';
module.exports = app => {
	const mongoose = app.mongoose;
	const roleSchema = new mongoose.Schema({
		// 角色
		roles: {
			type:Array
		},
		username:String
	})
}
// return mongoose.model('UserInfo', roleSchema);