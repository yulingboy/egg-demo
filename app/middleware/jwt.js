module.exports = (options, app) => {
	return async function jwt(ctx, next) {
		const token = ctx.request.header.authorization;
		let decode = '';
		if (token) {
			try {
				console.log(options.secret)
				// 解码token
				console.log(ctx.app.jwt.verify)
				console.log(token);
				decode = ctx.app.jwt.verify(token, options.secret);
				await next();
			} catch (error) {
				console.log(error)
				ctx.status = 401;
				ctx.body = {
					code: 1006,
					message: error.message == 'invalid token' ? 'token无效' : error.message
				};
				return;
			}
		} else {
			ctx.status = 401;
			ctx.body = {
				code: 1006,
				message: '没有token'
			};
			return;
		}
	};
};