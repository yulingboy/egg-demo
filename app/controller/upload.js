'use strict';
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const Controller = require('egg').Controller;

class UploadController extends Controller {
  	async create() {
		const { ctx } = this
    const file = ctx.request.files[0]
    const fileData = fs.readFileSync(file.filepath);
    const base64Str = Buffer.from(fileData, 'binary').toString('base64');
    const bufferData = Buffer.from(base64Str, 'base64');
    // 获取当前日期，用于文件夹创建
    const dirName = moment().format('YYYY-MM-DD')
    // 指定上传路径
			console.log( path.join(__dirname))
    const uploadBasePath = '../public/uploadForFile'
    // 文件重命名
			console.log(new Date().valueOf())
    const filename = `${new Date().valueOf()}${path.extname(file.filename)}`
    const dir = path.join(__dirname, uploadBasePath, dirName);
    const src = path.join(__dirname, uploadBasePath, dirName, filename);
    // 判断是否存在该文件夹，不存在则创建。
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    try {
      await fs.writeFileSync(src, bufferData);
      ctx.status = 200;
      ctx.body = {
        filename,
        url: `/public/uploadForFile/${dirName}/${filename}`
      };
    } catch (e) {
      ctx.status = 500;
      ctx.body = { msg: '上传文件失败' };
    }
    	
  }
}

module.exports = UploadController;
