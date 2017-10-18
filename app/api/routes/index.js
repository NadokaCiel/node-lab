'use strict';

import user from './user'
import token from './token'
import character from './character'
import Check from '../../middlewares/check'

const visitor = {
	user,
	token
}

const consumer = {
	character
}

export default app => {
	Object.keys(visitor).forEach(k => {
		app.use("/api", visitor[k])
	})

	Object.keys(consumer).forEach(k => {
		app.use("/api", Check.checkLogin, consumer[k])
	})
}
