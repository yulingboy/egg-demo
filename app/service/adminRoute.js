'use strict';

const Service = require('egg').Service;

class RouteService extends Service {
	async create(payload) {
		console.log(payload)
		console.log(this.ctx.model)
		const route = await this.ctx.model.AdminRoute.findOne({ where: { url: payload.url } });
		console.log(route)
		if (route) {
			this.ctx.throw(400, '路由重复');
		}
		await this.ctx.model.AdminRoute.create(payload)
  	}
}

module.exports = RouteService;
