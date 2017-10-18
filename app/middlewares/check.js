'use strict';

import config from 'config-lite'
import store from '../redis/store.js'

class Check {
	async checkLogin(req, res, next) {

		const token = req.cookies.token
		if (!token) {
			return unauthorized(res)
		} else {
			const redis_token = await store.getAsync(token)
			if (!redis_token) {
				return unauthorized(res, '登录超时，请您重新登陆')
			} else {
				next()
			}
		}
	}
}

function unauthorized(res, massage) {

	return res.send({
		status: 'unauthorized',
		massage: massage && massage.length > 0 ? massage : '用户未登录'
	})
}

export default new Check()
