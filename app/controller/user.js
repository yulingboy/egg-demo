'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	// 注册
  	async register() {
    	const { ctx, service } = this;
    	// 组装参数
		const payload = ctx.request.body || {};
    	// 调用 service 进行业务处理
    	const res = await service.user.register(payload);
    	// 设置响应内容和响应状态码
    	ctx.helper.success({ ctx, res });
	}
	// 登录
	async login() {
		const { ctx, service } = this;
    	// 组装参数
    	const payload = ctx.request.body || {};
    	// 调用 service 进行业务处理
    	const res = await service.user.login(payload);
    	// 设置响应内容和响应状态码
    	ctx.helper.success({ ctx, res });
	}
	// 根据ID查询用户
	async show() {
		const { ctx, service } = this;
    	// 组装参数
		const { id } = ctx.params;
    	// 调用 Service 进行业务处理
		const res = await service.user.findUser({ _id: id });
    	// 设置响应内容和响应状态码
		ctx.helper.success({ ctx, res });
	}
	// 获取当前用户信息
	async current() {
		const { ctx, service } = this;
		const res = await service.user.current();
		// 设置响应内容和响应状态码
		ctx.helper.success({ ctx, res });
	}
	// 根据ID删除用户
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const res = await service.user.destroy(id);
		ctx.helper.success({ ctx, res });
	}
	// 启用禁用用户
	async changeAble() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const res = await service.user.changeAble(id);
		ctx.helper.success({ ctx, res });
	}
}

module.exports = UserController;
