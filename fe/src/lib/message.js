import Vue from 'vue'

// Detail:
// http://element-cn.eleme.io/#/zh-CN/component/message-box

const vm = new Vue()

const defaultTitle = "Unknown Error"
const defaultMassage = "Something strange happened,Please contact administrators if you needed further assistance. "
const defaultOptions = () => {
	return {
		dangerouslyUseHTMLString: false,
		type: 'info', //success/info/warning/error
		customClass: '',
		cancelButtonText: 'Cancel',
		confirmButtonText: 'Confirm',
		cancelButtonClass: '',
		confirmButtonClass: '',
		closeOnClickModal: false,
		closeOnPressEscape: true
	}
}

export function hint(message = defaultMassage, title = defaultTitle, options = defaultOptions()) {
	const hintOption = Object.assign(options, defaultOptions())
	vm.$alert(message, title, hintOption)
}

export function aware(message = defaultMassage, title = defaultTitle, options = defaultOptions()) {
	const hintOption = Object.assign(options, defaultOptions())
	vm.$confirm(message, title, hintOption)
}
