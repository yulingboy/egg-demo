'use strict';
module.exports = {
  	register: {
    	username: {
      		type: 'string',
      		description: '用户名',
      		example: 'qwe',
    	},
    	password: {
    	  	type: 'string',
    	  	description: '密码',
    	  	example: '123456',
    	},
    	email: {
    	  	type: 'string',
    	  	description: '邮箱',
    	  	example: 'yuling@qq.com',
    	},
	},
	login: {
		password: {
		  	type: 'string',
		  	description: '密码',
		  	example: '123456',
		},
		email: {
		  	type: 'string',
		  	description: '邮箱',
		  	example: 'yuling@qq.com',
		},
	},
};
