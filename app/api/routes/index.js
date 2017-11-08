'use strict';

import user from './user'
import token from './token'
import password from './password'
import item from './item'
import character from './character'
import Check from '../../middlewares/check'

const visitor = {
	user,
	token
}

const customer = {
	item,
	character,
	password,
}

export default app => {
	Object.keys(visitor).forEach(k => {
		app.use("/api", visitor[k])
	})

	Object.keys(customer).forEach(k => {
		app.use("/api", Check.checkLogin, customer[k])
	})
}
