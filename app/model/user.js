'use strict';
module.exports = app => {
  	const mongoose = app.mongoose;
	const UserSchema = new mongoose.Schema(
		{
    		username: { type: String, unique: true, required: true,},
    		password: { type: String, required: true,},
			create_time: { type: Date, default: Date.now, },
			role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
			avatar: { type: String },
			email: { type: String },
			status: { type:Number, default:1}, // 1 启用 0 禁用
		}
	);
  return mongoose.model('User', UserSchema);
};
