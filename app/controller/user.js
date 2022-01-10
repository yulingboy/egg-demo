'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户模块
 */
class UserController extends Controller {
	constructor(ctx) {
		super(ctx)
	
		this.UserCreateTransfer = {
			email: { type: 'email', required: true, allowEmpty: false },
			username: { type: 'string', required: true, allowEmpty: false, min: 2, max: 6},
			password: { type: 'password', required: true, allowEmpty: false, min: 6 },
		}
	  }
	/**
	 * @summary 注册
	 * @description 注册用户
	 * @router POST /api/user/register
	 * @request body register *body
	 */
	async register() {
		const { ctx, service } = this;
		// 校验参数
		// const errors = ctx.validate(this.UserCreateTransfer);
		try {
			ctx.validate(this.UserCreateTransfer);
		} catch (err) {
			console.log('123')
			console.log(err)
			const messageObj = err.errors[0];
			throw({
				status: 400,
				message:`${messageObj.field}:${messageObj.message}`
			})	

		}
		// 组装参数
		const payload = ctx.request.body || {};
		// 调用 service 进行业务处理
		const res = await service.user.register(payload);
		// 发送验证码
		await service.tool.testEmail(res);
		// 设置响应内容和响应状态码
		ctx.helper.success({ ctx, res });
	}
	async login() {
		const { ctx, service } = this;
		// 校验参数
		try {
			ctx.validate(this.UserCreateTransfer);
		} catch (err) {
			const messageObj = err.errors[0];
			throw({
				status: 400,
				message:`${messageObj.field}:${messageObj.message}`
			})
		}
		// 组装参数
		const payload = ctx.request.body || {};
		// 调用 service 进行业务处理
		const res = await service.user.login(payload);
		// 设置响应内容和响应状态码
		ctx.helper.success({ ctx, res });
	}
	
}

module.exports = UserController;