export default {
	// 验证方法将传入全部规则，当前值以及回调函数
	// color(rule, value, callback){
	//   数据验证逻辑 code...
	//   未通过验证时，抛出异常及说明，将在表单下侧显示
	//   callback(new Error('illegal color！'));
	//   通过验证时，直接执行回调
	//   callback()
	// }
	color(rule, value, callback) {
		const pattern = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$")
		if (pattern.test(value)) {
			callback()
		} else {
			callback(new Error('illegal color！'))
		}
	}
}
