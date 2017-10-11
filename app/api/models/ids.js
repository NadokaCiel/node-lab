'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	character_id: Number,
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			character_id: 0,
		});
		newIds.save();
	}
})
export default Ids
