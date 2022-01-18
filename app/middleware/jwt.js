module.exports = (options, app) => {
	return async function jwt(ctx, next) {
		const token = ctx.request.header.authorization;
		console.log(token)
		let decode = '';
		if (token) {
			try {
				console.log('321312')
				// 解码token
				decode = ctx.app.jwt.verify(token, options.secret);
				console.log(decode,'123123')
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