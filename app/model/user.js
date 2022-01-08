module.exports = app => {
	const mongoose = app.mongoose
	const UserSchema = new mongoose.Schema({
		username: {
			type: String, // 类型
			unique: true, // 是否唯一
			required: true // 是否必须
		},
		password: {
			type: String,
			required: true
		},
		create_time: {
			type: Date,
			default: Date.now
		}
	})
	return mongoose.model('User', UserSchema);
}