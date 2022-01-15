'use strict';

const Service = require('egg').Service;

class UploadService extends Service {
   create() {
	return this.ctx.model.Attachment.create(payload) 
  }
}

module.exports = UploadService;
