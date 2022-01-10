module.exports = app => {
	const mongoose = app.mongoose
	const UserSchema = new mongoose.Schema({
		email: {
			type: 'string',
			required:true
		},
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
		},
		id: {
			type: Number,
			default: new Date()
		},
		code: String,  //激活码，格式自己定义
		//过期日期，过期后不能激活
		active_time: {
			type:String
		}, 
		islive: {
			type: Boolean, //判断是否激活
			default:false
		}
	})
	return mongoose.model('User', UserSchema);
}