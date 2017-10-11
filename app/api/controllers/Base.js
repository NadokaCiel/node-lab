export default class BaseController {
	constructor() {
		this.makeList = this.makeList.bind(this)
	}
	async makeList(model, req, res) {
		let size = Number(req.query.size) || 10
		let page = req.query.page || 1
		let offset = Number((page - 1) * size)
		try {
			const arr = await model.find().skip(offset).limit(size)
			const count = await model.count()
			return success(res, repackList(arr, count))
		} catch (err) {
			return error(res, err)
		}
	}

	success(res, data) {

		return res.json({
			status: 'success',
			data
		})
	}

	error(res, massage) {

		return res.send({
			status: 'error',
			massage
		})
	}

	repackList(arr, count) {

		return {
			list: arr,
			total: count
		}
	}
}
