'use strict';

class BaseController {
	constructor() {
		this.repackList = this.repackList.bind(this)
	}
	async repackList(model, req, res) {
		let size = Number(req.query.size) || 10
		let page = req.query.page || 1
		let offset = Number((page - 1) * size)
		try {
			const arr = await model.find().skip(offset).limit(size)
			const count = await model.count()
			return this.success(res, this.makeList(arr, count))
		} catch (err) {
			return this.error(res, err)
		}
		return this.error(res)
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
			massage: massage && massage.length > 0 ? massage : '未知错误'
		})
	}

	makeList(arr, count) {

		return {
			list: arr,
			total: count
		}
	}
}

export default BaseController
