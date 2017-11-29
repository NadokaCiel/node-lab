module.exports = app => {
	const { router, middlewares } = app
	const checkLogin = middlewares.checkLogin()
	router.resources('user', '/api/user', checkLogin, 'user')
	router.post('user', '/api/user', 'user.createAccount')
	router.put('password', '/api/password', checkLogin, 'password.update')
	router.resources('token', '/api/token', 'token')
};
