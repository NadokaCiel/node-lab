'use strict';

export function repackList(model, req, res) {
	let size = Number(req.query.size) || 10
	let page = req.query.page || 1
	let offset = Number((page - 1) * size)
	model.find({}, function(err, arr) {
		if (err)
			return error(res, err)
		model.count({}, function(err, count) {
			if (err)
				return error(res, err)
			return success(res, makeList(arr, count))
		});
	}).skip(offset).limit(size);
}

export function success(res, data) {

	return res.json({
		status: 'success',
		data
	})
}

export function error(res, massage) {

	return res.send({
		status: 'error',
		massage: massage && massage.length > 0 ? massage : '未知错误'
	})
}

function makeList(arr, count) {

	return {
		list: arr,
		total: count
	}
}
