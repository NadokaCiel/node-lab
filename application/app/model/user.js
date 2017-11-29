module.exports = app => {
	const mongoose = app.mongoose;
	const UserSchema = new mongoose.Schema({
		id: Number,
		user_name: {
			type: String,
			Required: 'Kindly enter the name of the name'
		},
		create_time: {
			type: Date,
			default: Date.now
		},
		password: {
			type: String,
			Required: 'Kindly enter the password of the user'
		},
		rank: Number, //1:普通用户、 2:管理员
	});

	UserSchema.index({
		id: 1
	});

	return mongoose.model('User', UserSchema);
}
