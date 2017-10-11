'use strict';

import CharacterModel from '../../models/character/Character'
import * as Common from '../Common'

class Character {
	constructor() {
	}

	async list(req, res) {
		await Common.repackList(CharacterModel, req, res)
	}

	async create(req, res) {
		if (!req.body || !req.body.name) {
			return Common.error(res, "Parameter missing！")
		}
		const new_character = new CharacterModel(req.body)
		try{
			const character = await new_character.save()
			await Common.success(res, character)
		}
		catch(err){
			await Common.error(res, err)
		}
	}

	async read(req, res) {
		if (!req.params || !req.params.characterId) {
			return Common.error(res, "Parameter missing！")
		}
		try{
			const character = await CharacterModel.findById(req.params.characterId)
			await Common.success(res, character)
		}
		catch(err){
			await Common.error(res, err)
		}
	}

	async update(req, res) {
		if (!req.params || !req.params.characterId) {
			return Common.error(res, "Parameter missing！")
		}
		try{
			const character = await CharacterModel.findOneAndUpdate(req.params.characterId, req.body, {new: true})
			await Common.success(res, character)
		}
		catch(err){
			await Common.error(res, err)
		}
	}

	async delete(req, res) {
		if (!req.params || !req.params.characterId) {
			return Common.error(res, "Parameter missing！")
		}
		try{
			const character = await CharacterModel.remove({_id: req.params.characterId})
			await Common.success(res, "Character successfully deleted")
		}
		catch(err){
			await Common.error(res, err)
		}
	}
}

export default new Character()
