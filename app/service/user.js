'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  	// 注册
  	async register(payload) {
    	// 判断用户是否已经存在
    	const user = await this.ctx.service.user.findUser({ email: payload.email });
    	if (user) {
      		this.ctx.throw(404, '邮箱已被使用');
    	}
    	// 密码加密
    	payload.password = await this.ctx.genHash(payload.password);
    	return this.ctx.model.User.create(payload);
  	}
  	// 登录
  	async login(payload) {
    	// 获取用户
			console.log(payload)
    	const user = await this.ctx.service.user.findUser({ email: payload.email });
    	if (!user) {
      		this.ctx.throw(404, '用户不存在');
    	}
    	// 校验密码
    	const checkPass = await this.ctx.compare(payload.password, user.password);
    	if (!checkPass) {
      		this.ctx.throw(404, '密码错误');
    	}
    	// 生成Token令牌
			const token = await this.ctx.service.actionToken.apply(user._id);
			console.log(token)
    	return {
      		token: token,
      		email: user.email,
    	};
  	}
  	// 查询单个用户信息
  	async findUser(searchObj) {
    	return this.ctx.model.User.findOne(searchObj);
  	}
  	// 根据修改用户信息
  	async update(id, payload) {
    	return this.ctx.model.User.findByIdAndUpdate({ _id: id }, payload, { $set: true });
	}
	async current() {
		const { ctx, service } = this;
		console.log(ctx.state.user)
    	// ctx.state.user 可以提取到JWT编码的data
		const _id = ctx.state.user.data._id;
		const user = await service.user.findUser({_id});
    	if (!user) {
			ctx.throw(404, 'user is not found');
    	}
		user.password = 'How old are you?';
		return user;
	}
}

module.exports = UserService;
