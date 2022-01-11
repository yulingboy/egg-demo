'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
	router.redirect('/', '/swagger-ui.html', 302);
	router.get('/test', controller.home.test);
	router.post('/api/user/register', controller.user.register);
	router.post('/api/user/login', controller.user.login);
	router.get('/api/common/sendEmail', controller.common.sendEmail);
	router.get('/api/common/checkCode', controller.common.checkCode);
};
