'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 邮箱模块
 */
class CommonController extends Controller {
  /**
	 * @summary 邮件
	 * @description 给指定邮箱发送邮件
	 * @router POST /api/email/sendEmail
	 * @request body sendEmail *body
	 */
  async sendEmail() {
    const {
      ctx,
      service,
    } = this;
    // 调用 service 进行业务处理
    const payload = ctx.request.body || {};
    const res = await service.email.concatEmail(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({
      ctx,
      res,
    });
  }
  //   async checkCode() {
  //     const { ctx, service } = this;
  //     console.log(ctx.request.query);
  //     const payload = ctx.request.query || {};
  //     const res = await service.email.checkCode(payload);
  // 	// 设置响应内容和响应状态码
  //     ctx.helper.success({ ctx, res });
  //   }
}

module.exports = CommonController;
