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
}

module.exports = CommonController;