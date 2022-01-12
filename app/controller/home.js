'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 测试 TestController
 */

class HomeController extends Controller {

  /**
      * @summary 接口的小标题信息
      * @description 接口的描述信息
      * @router get /test
      * @request query string str 对参数str的描述
      * @response 200 testResponse ok
      */
  async test() {
    const { ctx } = this;
    const str = ctx.query.str;
    ctx.body = await {
      message: 'swagger is OK!!! and query is:' + str,
    };
  }
}

module.exports = HomeController;
