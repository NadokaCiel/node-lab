'use strict';

import ItemModel from '../../models/item/Item'
import {
	getId,
	repackList,
	success,
	error
} from '../Common'

class Item {

	async list(req, res) {
		await repackList(ItemModel, req, res)
	}

	async create(req, res) {
		if (!req.body || !req.body.name) {
			return error(res, "Parameter missing！")
		}
		const new_item = new ItemModel(req.body)
		try{
			new_item.id = await getId('item_id')
			const item = await new_item.save()
			await success(res, item)
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
			const item = await ItemModel.findOne({id:req.params.id})
			await success(res, item)
		}
		catch(err){
			await error(res, err)
		}
	}

	async update(req, res) {
		if (!req.params || !req.params.id || !req.body.name) {
			return error(res, "Parameter missing！")
		}
		try{
			const item = await ItemModel.findOneAndUpdate({id:req.params.id}, req.body, {new: true})
			await success(res, item)
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
			const item = await ItemModel.remove({id: req.params.id})
			await success(res, "Item successfully deleted")
		}
		catch(err){
			await error(res, err)
		}
	}
}

export default new Item()
