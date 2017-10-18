'use strict';

import UserModel from '../../models/user/User'
import {
	getId,
	encryption,
	repackList,
	success,
	error
} from '../Common'

class User {

	async list(req, res) {
		await repackList(UserModel, req, res)
	}

	async create(req, res) {
		if (!req.body || !req.body.user_name || !req.body.password) {
			return error(res, "Parameter missing！")
		}
		const new_user = new UserModel(req.body)
		new_user.id = await getId('user_id')
		new_user.password = encryption(new_user.password)
		try{
			const user = await new_user.save()
			await success(res, user)
		}
		catch(err){
			await error(res, err)
		}
	}

	async read(req, res) {
		if (!req.params || !req.params.id) {
			return error(res, "Parameter missing！")
		}
		try{
			const user = await UserModel.findOne({id:req.params.id})
			await success(res, user)
		}
		catch(err){
			await error(res, err)
		}
	}

	async update(req, res) {
		if (!req.params || !req.body.user_name || !req.body.password) {
			return error(res, "Parameter missing！")
		}
		try{
			const user = await UserModel.findOneAndUpdate(req.params.id, req.body, {new: true})
			await success(res, user)
		}
		catch(err){
			await error(res, err)
		}
	}

	async delete(req, res) {
		if (!req.params || !req.params.id) {
			return error(res, "Parameter missing！")
		}
		try{
			const user = await UserModel.remove({id: req.params.id})
			await success(res, "User successfully deleted")
		}
		catch(err){
			await error(res, err)
		}
	}
}

export default new User()
