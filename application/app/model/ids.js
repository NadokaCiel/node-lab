module.exports = app => {
	const mongoose = app.mongoose;
	const IdsSchema = new mongoose.Schema({
		user_id: Number,
		item_id: Number,
		character_id: Number,
	});

	IdsSchema.index({
		id: 1
	});

	const Ids = mongoose.model('Ids', IdsSchema)

	Ids.findOne((err, data) => {
		if (!data) {
			const newIds = new Ids({
				user_id: 0,
				item_id: 0,
				character_id: 0,
			});
			newIds.save()
		}
	})

	return Ids
}
