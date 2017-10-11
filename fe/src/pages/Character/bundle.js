export default {
	self: {
		invisiable: true,
		icon: "fa-user",
		path: '/character/list',
	},
	List: {
		icon: "fa-list",
		path: '/character/list',
		component: r => require.ensure([], () => r(require('./List.vue')), 'character')
	},
	Edit: {
		invisiable: true,
		icon: "fa-edit",
		path: '/character/edit/:id',
		component: r => require.ensure([], () => r(require('./Edit.vue')), 'character')
	}
}
