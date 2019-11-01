const createRule = {
	user_name: {
		type: 'string',
		required: true
	},
	password: {
		type: 'password',
		required: true,
		allowEmpty: false,
		min:4
	},
}

const updateRule = {
	id: {
		type: 'number',
		required: true
	},
	user_name: {
		type: 'string',
		required: true
	},
}

module.exports = app => {
	class UserController extends app.BaseController {

		async index() {
			await this.repackList('User', '-password')
			// this.ctx.status = 200
		}

		async createAccount() {
			try {
				this.ctx.validate(createRule)

				const repeat = await this.ctx.model.User.find({
					user_name: this.ctx.request.body.user_name
				}).select('-password')
				if(repeat.length > 0) {
					return this.error("Username already used")
				}

				const new_user = new this.ctx.model.User(this.ctx.request.body)
				new_user.id = await this.getId('user_id')
				new_user.password = this.encryption(new_user.password)
				const user = await new_user.save()

				this.success({
					id: user.id
				})
				// this.ctx.status = 201
			} catch (err) {
				this.error(err)
				// this.error("Create User Failed")
			}
		}

		async show() {
			if (!this.ctx.params.id) {
				return this.error("Parameter missing！")
			}
			try {
				const user = await this.ctx.model.User.findOne({
					id: this.ctx.params.id
				}).select('-password')
				this.success(user)
				// this.ctx.status = 200
			} catch (err) {
				this.error("Get User Failed")
			}
		}

		async update() {
			try {
				this.ctx.validate(updateRule)

				let data = this.ctx.request.body

				const repeat = await this.ctx.model.User.find({
					id: { $ne:data.id },
					user_name: this.ctx.request.body.user_name,
				}).select('-password')
				if(repeat.length > 0) {
					return this.error("Username already used")
				}

				const user = await this.ctx.model.User.findOneAndUpdate({
					id: data.id
				}, data, {
					new: true
				}).select('-password')
				this.success(user)
				// this.ctx.status = 200
			} catch (err) {
				return this.error("Update User Failed")
			}
		}

		async destroy() {
			if (!this.ctx.params.id) {
				return this.error("Parameter missing！")
			}
			try {
				const user = await this.ctx.model.User.remove({id: this.ctx.params.id})
				this.success("User successfully deleted")
				// this.ctx.status = 204
			} catch (err) {
				this.error("Delete User Failed")
			}
		}

	}
	return UserController;
}
