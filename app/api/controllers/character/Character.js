'use strict';

import CharacterModel from '../../models/character/Character'
import {
	getId,
	repackList,
	success,
	error
} from '../Common'

class Character {

	async list(req, res) {
		await repackList(CharacterModel, req, res)
	}

	async create(req, res) {
		if (!req.body || !req.body.name) {
			return error(res, "Parameter missing！")
		}
		const new_character = new CharacterModel(req.body)
		new_character.id = await getId('character_id')
		try{
			const character = await new_character.save()
			await success(res, character)
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
			const character = await CharacterModel.findOne({id:req.params.id})
			await success(res, character)
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
			const character = await CharacterModel.findOneAndUpdate({id:req.params.id}, req.body, {new: true})
			await success(res, character)
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
			const character = await CharacterModel.remove({id: req.params.id})
			await success(res, "Character successfully deleted")
		}
		catch(err){
			await error(res, err)
		}
	}
}

export default new Character()
