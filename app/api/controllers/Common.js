'use strict';

import crypto from 'crypto'
import {Ids,idList} from '../models/ids'

export async function repackList(model, req, res, select) {
	let size = Number(req.query.size) || 10
	let page = req.query.page || 1
	let offset = Number((page - 1) * size)
	let filter = select || ''

	try {
		const arr = await model.find().select(filter).skip(offset).limit(size)
		const count = await model.count()
		return success(res, makeList(arr, count))
	} catch (err) {
		return error(res, err)
	}
	return error(res)
}

export function success(res, data) {

	if(!data){
		return error(res, 'The data you requested does not exist.')
	}

	return res.json({
		status: 'success',
		data
	})
}

export function unauthorized(res, massage) {

	return res.send({
		status: 'unauthorized',
		massage: massage && massage.length > 0 ? massage : 'Please login before your further operation.'
	})
}

export function error(res, massage) {

	return res.send({
		status: 'error',
		massage: massage && massage.length > 0 ? massage : 'Unknown error.'
	})
}

//获取id列表
export async function getId(type) {
	if (!idList.includes(type)) {
		console.log('ID type error!')
		throw new Error('ID type error!')
		return
	}
	try {
		const idData = await Ids.findOne()
		if(!idData[type] && idData[type] !== 0){
			const newIds = {}
			newIds[type] = 0
			await Ids.update({}, { $set: newIds}, {multi: 1})
		}
		idData[type]++
		await idData.save()
		return idData[type]
	} catch (err) {
		console.log('Get ID failed!')
		throw new Error(err)
		return
	}
}

export function encryption(password) {
	const newpassword = Md5(Md5(password).substr(2, 4) + Md5(password))
	return newpassword
}

export function Md5(password) {
	const md5 = crypto.createHash('md5')
	return md5.update(password).digest('base64')
}

function makeList(arr, count) {

	return {
		list: arr,
		total: count
	}
}
