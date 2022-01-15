'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  	constructor(ctx) {
    	super(ctx);

    	this.UserCreateTransfer = {
      		email: { type: 'email', required: true, allowEmpty: false },
      		username: { type: 'string', required: true, allowEmpty: false, min: 2, max: 6 },
      		password: { type: 'password', required: true, allowEmpty: false, min: 6 },
    	};
	}
	// 注册
  	async register() {
    	const { ctx, service } = this;
    	// 校验参数
    	try {
      		ctx.validate(this.UserCreateTransfer);
    	} catch (err) {
      		const messageObj = err.errors[0];
      		throw ({
        		status: 400,
        		message: `${messageObj.field}:${messageObj.message}`,
      		});
    	}
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
		console.log('qwe',ctx.request.body)
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

}

module.exports = UserController;
