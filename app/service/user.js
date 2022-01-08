'use strict';

const Service = require('egg').Service;

class UserService extends Service {
	// 注册
	async register(payload) {
		
		const user = await this.ctx.service.user.findUser({ username: payload.username });
		if (user) {
			this.ctx.throw(404,'用户已存在')
		}
		return await this.ctx.model.User.create(payload);
	};
	// 查询单个用户信息
	async findUser(searchObj) {
		return this.ctx.model.User.findOne(searchObj)
	}
}

module.exports = UserService;