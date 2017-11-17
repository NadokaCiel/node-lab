export default {
	self: {
		invisiable: true,
		icon: "fa-database",
		path: '/item/list',
	},
	List: {
		icon: "fa-list",
		path: '/item/list',
		component: r => require.ensure([], () => r(require('./List.vue')), 'item')
	},
	Edit: {
		invisiable: true,
		icon: "fa-edit",
		path: '/item/edit/:id',
		activeAs: 'List',
		component: r => require.ensure([], () => r(require('./Edit.vue')), 'item')
	},
	Test: {
		icon: "fa-wrench",
		path: '/item/test',
		component: r => require.ensure([], () => r(require('./Test.vue')), 'item')
	}
}
