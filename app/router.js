'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	const jwt = app.middleware.jwt(app.config.jwt);
	router.redirect('/api', '/swagger-ui.html', 302);
	router.get('/', controller.home.test);
	router.post('/api/common/register', controller.user.register);
	router.post('/api/common/login', controller.user.login);
	router.get('/api/common/current', app.jwt, controller.user.current);

	router.get('/api/users/:id', controller.user.show);
	router.delete('/api/users/:id', controller.user.destroy);
	router.patch('/api/users/:id/status', controller.user.changeAble);
	

	router.post('/api/email/sendEmail', controller.email.sendEmail);
	//   router.get('/api/email/checkCode', controller.email.checkCode);

	router.post('/api/uploads/upload', controller.upload.create);

	router.post('/api/roles', controller.role.create);
	router.delete('/api/roles/:id', controller.role.destroy);
	router.put('/api/roles/:id', controller.role.update);
	router.get('/api/roles/:id', controller.role.show);
	router.get('/api/roles/:size/:current', controller.role.index);
	router.get('/api/roles', controller.role.list);
};
