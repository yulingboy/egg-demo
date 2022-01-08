'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户模块
 */
class UserController extends Controller {
	/**
	 * @summary 注册
	 * @description 注册用户
	 * @router POST /api/user/register
	 * @request body register *body
	 */
	async register() {
		const { ctx, service } = this;
		// 组装参数
		const payload = ctx.request.body || {};
		// 调用 service 进行业务处理
		const res = await service.user.register(payload);
		// 设置响应内容和响应状态码
		ctx.helper.success({ctx, res})
	}
}

module.exports = UserController;