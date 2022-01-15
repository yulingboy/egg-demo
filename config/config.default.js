/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
  const config = exports = {};

  // cookie签名秘钥
  config.keys = appInfo.name + '_1641608887304_2895';

  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: [ 'http://localhost:7001' ],
  };

  // 中间件
  config.middleware = [ 'errorHandler' ];

  // 静态文件配置
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, '/app/public'),
  };
  // swagger文档参数配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    apiInfo: {
      title: '接口文档', // 接口文档的标题
      description: 'swagger 测试接口文档', // 接口文档描述
      version: '1.0.0', // 接口文档版本
      termsOfService: 'http://swagger.io/terms/', // 服务条件
      contact: {
        email: 'sunjianfeng@csxiaoyao.com', // 联系方式
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    basePath: '/', // 配置基础路径
    schemes: [ 'http', 'https' ], // 配置支持的协议
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: {}, // 配置接口安全授权方式
    enableSecurity: false, // 是否启用授权，默认 false
    // enableValidate: true, // 是否启用参数校验，默认 true
    routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
    enable: true, // 默认 true
  };
  // mongoose 配置
  config.mongoose = {
    url: 'mongodb://47.98.179.228:27017/test',
    options: {
      // bufferMaxEntries: 0,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      auto_reconnect: true, // 自动重连
    },
  };
  // bcrypt配置
  config.bcrypt = {
    saltRounds: 10, // default 10
  };
  config.validate = { // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用 convertType 规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };
  config.jwt = {
    secret: 'qwe',
    // enable: true, // default is false
    // match: '/jwt', // optional
  };
  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    fileExtensions: ['.png', '.jpg'], // 扩展几种上传的文件格式
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  return {
    ...config,
    ...userConfig,
  };
};
