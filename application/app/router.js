'use strict';

const serve = require('koa-static-server')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, middlewares } = app
	const checkLogin = middlewares.checkLogin()
	router.resources('user', '/api/user', 'user')
	router.post('user', '/api/user', 'user.createAccount')
	router.put('password', '/api/password', checkLogin, 'password.update')
	router.resources('token', '/api/token', 'token')
	app.use(serve({rootDir: 'app/public', rootPath: '/public'}))
};
