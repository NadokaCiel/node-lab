import Vue from 'vue'
import axios from 'axios'

const vm = new Vue()

export function ajax(method, url, payload = {}, successFunc, errorFunc) {
	if (!axios[method]) {
		throw new Error('不支持的请求类型');
	}
	if (method == 'get') {
		url = getUrl(url, payload)
	}
	return axios[method](url, payload).then(response => {
		const data = response.data
		if (data.status == "success") {
			successFunc && successFunc(data.data)
		} else if (data.status == "unauthorized") {
			vm.$aware(data.massage, "Operation Failed", {
				type: 'warning',
				confirmButtonText: 'Login',
				callback: (action) => {
					if (action == 'cancel') return
					this.$router && this.$router.push({name:"Login"})
				}
			})
		} else {
			vm.$hint(data.massage, 'Operation Failed', {
				type: 'error'
			})
			errorFunc && errorFunc(data)
		}
	}).catch(error => {
		console.log(error)
		vm.$hint("There was a problem connecting to the server", 'Server Failure', {
			type: 'error'
		})
		errorFunc && errorFunc(error)
	});
}

function getUrl(url, payload) {
	let query = []
	let queryString = ""
	Object.keys(payload).forEach(k => {
		query.push(k + "=" + payload[k])
	})
	query.length > 0 ? queryString = "?" + query.join('&') : ''
	return url + queryString
}
