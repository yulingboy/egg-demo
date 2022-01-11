'use strict';

const moment = require('moment');

const Service = require('egg').Service;

const nodemailer = require('nodemailer');
const user_email = 'yulinglsy@126.com';
const auth_code = 'LJQRUZCZTZFTXZLG';

const transporter = nodemailer.createTransport({
	service: '126',
	secureConnection: true,
	port: 465,
	auth: {
		user: user_email, // 账号
		pass: auth_code, // 授权码

	},
});

class ToolService extends Service {
	// 发送邮件
	async sendMail(email, subject, text, html) {
		const mailOptions = {
			from: user_email, // 发送者,与上面的user一致
			to: email, // 接收者,可以同时发送多个,以逗号隔开
			subject, // 标题
			text, // 文本
			html,
		};

		try {
			await transporter.sendMail(mailOptions);
			return true;
		} catch (err) {
			return false;
		}
	}
	// 组合邮件内容
	async testEmail(res) {
		console.log(res)
		const ctx = this.ctx;
		const { _id } = res;
		let code = parseInt(Math.random() * 10000) // 随机验证码
		let options = {
			code,
			active_time: moment(res.create_time).add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
			islive: false
		}
		let resObj = await ctx.service.user.update(_id, options);
		console.log(resObj,'qweqw')

		const email = res.email; // 接收者的邮箱
		const subject = '激活邮件';
		// const text = '这是一封测试邮件';
		const text = '测试'
		const html = '<p>请在3天内激活<a href="http://localhost:7002/api/common/checkCode?_id='+ res._id +'&code='+ code + '">点击激活</a></p>';

		const has_send = await this.service.tool.sendMail(email, subject, text,html);

		if (has_send) {
			console.log('发送成功')
			ctx.body = {
				message: '发送成功',
			};
			return;
		}
		ctx.body = {
			message: '发送失败',
		};
	}
	// 校验验证码
	async checkCode(payload) {
		// 根据ID查询用户是否存在
		const user = await this.ctx.service.user.findUser({ _id: payload._id })
		if (!user) {
			this.ctx.throw(404, '用户不存在');
		}
		// 判断条件是否符合
		const isActive = moment().isSameOrBefore(moment(user.active_time));
		if (user.code === payload.code && isActive) {
			return this.ctx.response.sendRedirect("/");
		} else {
			throw(404,'已过期')
		}
	}

}

module.exports = ToolService;