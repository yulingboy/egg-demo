'use strict';
const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '操作成功', }) => {
  ctx.body = { code: '1000', data: res, msg };
  ctx.status = 200;
};
