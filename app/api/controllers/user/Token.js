'use strict';

import config from 'config-lite'
import store from '../../../redis/store.js'
import UserModel from '../../models/user/User'
import {
	getId,
	encryption,
	success,
	error
} from '../Common'

class Token {

	async create(req, res) {
		if (!req.body || !req.body.user_name || !req.body.password) {
			return error(res, "Parameter missing！")
		}
		const name = req.body.user_name
		const user = await UserModel.findOne({user_name:name})
		if(!user){
			return error(res, "User doesn't exsit")
		}
		if(user.password != encryption(req.body.password)){
			return error(res, "Wrong password")
		}
		try{
			const now = Date.now() + ''
			const token = encryption(name + now)
			const auth = encryption(name)
			await store.setAsync(token, user.id, 'EX', 7 * 24 * 60 * 60 * 1000)
			res.cookie('token', token, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false })
			res.cookie('auth', auth, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false })
		    return success(res, "Login successfully.")
		}
		catch(err){
			return error(res, err)
		}
	}

	async delete(req, res) {
		const token = req.cookies.token
		if(!token){
			return success(res, "Logout successfully.")
		}
		try{
			await store.delAsync(token)
			res.clearCookie('token')
			return success(res, "Logout successfully.")
		}
		catch(err){
			return error(res, err)
		}
	}
}

export default new Token()
