export default {
	self: {
		invisiable: true,
		icon: "fa-user",
		path: '/user/list',
	},
	List: {
		icon: "fa-list",
		path: '/user/list',
		component: r => require.ensure([], () => r(require('./List.vue')), 'user')
	},
	Edit: {
		invisiable: true,
		icon: "fa-edit",
		path: '/user/edit/:id',
		activeAs: 'List',
		component: r => require.ensure([], () => r(require('./Edit.vue')), 'user')
	}
}
