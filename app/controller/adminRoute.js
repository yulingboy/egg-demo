'use strict';

const Controller = require('egg').Controller;

class RouteController extends Controller {
	// 新增接口
  	async create() {
		const { ctx, service } = this;
		const payload = ctx.request.body || {};
		const res = await service.adminRoute.create(payload);
		ctx.helper.success({ctx})
  	}
}

module.exports = RouteController;
