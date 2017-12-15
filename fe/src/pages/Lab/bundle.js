export default {
	self: {
		invisiable: true,
		icon: "fa-wrench",
		path: '/lab/',
	},
	Birth: {
		icon: "fa-file-text-o",
		path: '/lab/birth/',
		component: r => require.ensure([], () => r(require('./Birth.vue')), 'Lab')
	},
}
