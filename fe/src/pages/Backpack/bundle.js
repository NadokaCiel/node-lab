export default {
	self: {
		invisiable: false,
		icon: "fa-suitcase",
		path: '/backpack/list',
		component: r => require.ensure([], () => r(require('./List.vue')), 'backpack')
	},
}
