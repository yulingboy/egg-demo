'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {
	async sendEmail() {
		const { ctx, service } = this;
		// 调用 service 进行业务处理
		const res = await service.tool.testEmail();
		// 设置响应内容和响应状态码
		ctx.helper.success({ ctx, res});
	}
	async checkCode() {
		const { ctx, service } = this;
		console.log(ctx.request.query)
		const payload = ctx.request.query || {};
		const res = await service.tool.checkCode(payload);

	}
}

module.exports = CommonController;