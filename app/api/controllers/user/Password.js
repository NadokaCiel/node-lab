'use strict';

import config from 'config-lite'
import store from '../../../redis/store.js'
import UserModel from '../../models/user/User'
import {
	encryption,
	success,
	error,
	unauthorized
} from '../Common'

class Password {

	async update(req, res) {
		if (!req.body || !req.body.o_password || !req.body.n_password) {
			return error(res, "Parameter missing！")
		}
		if (req.body.o_password == req.body.n_password) {
			return error(res, "New password can't be identical.")
		}
		const token = req.cookies.token
		if(!token){
			return unauthorized(res)
		}
		let id = ''
		try{
			id = await store.getAsync(token)
		}
		catch(err){
			return error(res, err)
		}
		const user = await UserModel.findOne({id})
		if(!user){
			return error(res, "User doesn't exsit")
		}
		if(user.password != encryption(req.body.o_password)){
			return error(res, "Wrong password")
		}

		try{
			const now = Date.now() + ''
			const n_token = encryption(user.user_name + now)
			const auth = encryption(user.user_name)
			await store.delAsync(token)
			await store.setAsync(n_token, id, 'EX', 7 * 24 * 60 * 60 * 1000)
			res.cookie('token', n_token, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false })
			res.cookie('auth', auth, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false })
			user.password = encryption(req.body.n_password)
			const n_user = await UserModel.findOneAndUpdate(id, user, {new: true}).select('-password')
			await success(res, "Change password successfully.")
		}
		catch(err){
			return error(res, err)
		}

	}

}

export default new Password()
