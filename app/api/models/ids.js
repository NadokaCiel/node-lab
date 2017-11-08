'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	user_id: Number,
	item_id: Number,
	character_id: Number,
});

export const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			user_id: 0,
			item_id: 0,
			character_id: 0,
		});
		newIds.save();
	}
})

export const idList = ['user_id', 'item_id', 'character_id']
