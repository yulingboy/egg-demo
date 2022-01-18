'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  	// 注册
  	async register(payload) {
    	// 判断用户是否已经存在
    	const user = await this.ctx.service.user.findUser({ username: payload.username });
    	if (user) {
      		this.ctx.throw(400, '账号已存在');
    	}
    	// 密码加密
		payload.password = await this.ctx.genHash(payload.password);
		// 新增用户
		await this.ctx.model.User.create(payload);
  	}
  	// 登录
  	async login(payload) {
    	// 获取用户
    	const user = await this.ctx.service.user.findUser({ username: payload.username });
    	if (!user) {
      		this.ctx.throw(400, '用户名错误');
    	}
    	// 校验密码
    	const checkPass = await this.ctx.compare(payload.password, user.password);
    	if (!checkPass) {
      		this.ctx.throw(400, '密码错误');
    	}
    	// 生成Token令牌
		const token = await this.ctx.service.actionToken.apply(user._id);
    	return {
      		token: token,
    	};
	}
  	// 查询单个用户信息
  	async findUser(searchObj) {
		const user = await this.ctx.model.User.findOne(searchObj).populate('role','_id name');
		if (!user) {
			throw(404, '用户不存在')
		}
		return user	
  	}
  	// 根据修改用户信息
  	async update(id, payload) {
    	return this.ctx.model.User.findByIdAndUpdate({ _id: id }, payload, { $set: true });
	}
	// 根据 token 获取当前用户信息
	async current() {
		const { ctx, service } = this;
    	// ctx.state.user 可以提取到JWT编码的data
		const _id = ctx.state.user.data._id;
		const user = await this.ctx.model.User.findById({_id}).populate('role','_id name');
    	if (!user) {
			ctx.throw(404, 'user is not found');
    	}
		user.password = 'How old are you?';
		return user;
	}
	// 根据 ID 删除用户
	async destroy(payload) {
		const { ctx, service } = this;
		const user = await ctx.model.User.findById({ _id: payload })
		if (!user) {
			return ctx.throw(404, '用户不存在')
		}
		await ctx.model.User.findByIdAndDelete({ _id: payload });
	}
	// 切换用户启用禁用状态
	async changeAble(payload) {
		const { ctx, service } = this;
		const user = await ctx.model.User.findById({ _id: payload })
		if (!user) {
			return ctx.throw(404, '用户不存在')
		}
		await ctx.model.User.findByIdAndUpdate({ _id: payload }, { $set: { status: user.status === 1 ? 0 : 1 } });
	}
}

module.exports = UserService;
