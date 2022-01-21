'use strict';

const axios = require('axios');
const Controller = require('egg').Controller;

class AdminWpController extends Controller {
	async access() {
		const { ctx } = this;
		const API_KEY = ctx.app.config.wp.Appkey;
		const REDICTRECT_URL = ctx.app.config.wp.redirect_uri;
		let url = `https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${REDICTRECT_URL}`;
		ctx.redirect(url)
		await this.ctx.curl(url);
		
	}
	async accessCallBack() {
		const { ctx, service } = this;
		const { code } = ctx.request.query;
		const GRANT_TYPE = 'authorization_code';
		const CODE = code;
		const CLIENT_ID = ctx.app.config.wp.Appkey;
		const CLIENT_SCRET = ctx.app.config.wp.Secretkey;
		const REDICTRECT_URL = ctx.app.config.wp.redirect_uri;
		const URL = `https://openapi.baidu.com/oauth/2.0/token?grant_type=${GRANT_TYPE}&code=${CODE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SCRET}&redirect_uri=${REDICTRECT_URL}`;
		const {data} = await this.ctx.curl(URL, { 
			dataType: 'json', 
			timeout: 5000
		});
		console.log(data)
		ctx.body = data
	}
}

module.exports = AdminWpController;
