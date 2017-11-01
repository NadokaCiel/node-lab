import Vue from 'vue'

const vm = new Vue()

const defaultTitle = "Unknown Error"
const defaultMassage = "Something strange happened,Please contact administrators if you needed further assistance. "
const defaultOptions = {
	dangerouslyUseHTMLString: false,
	type: 'info', //success/info/warning/error
	customClass: '',
	cancelButtonText: 'Cancel',
	confirmButtonText: 'Confirm',
	cancelButtonClass: '',
	confirmButtonClass: ''
}

export function hint(message = defaultMassage, title = defaultTitle, options = defaultOptions) {
	const config = Object.assign({}, defaultOptions)
	const hintOption = Object.assign(config, options)
	vm.$alert(message, title, hintOption)
}
