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
	Tetris: {
		icon: "fa-plus-square-o",
		path: '/lab/tetris/',
		component: r => require.ensure([], () => r(require('./Tetris.vue')), 'Lab')
	},
	Cartoon: {
		icon: "fa-superpowers",
		path: '/lab/cartoon/',
		component: r => require.ensure([], () => r(require('./Cartoon.vue')), 'Lab')
	},
	Cellular: {
		icon: "fa-braille",
		path: '/lab/cellular/',
		component: r => require.ensure([], () => r(require('./Cellular.vue')), 'Lab')
	},
	Charts: {
		icon: "fa-pie-chart",
		path: '/lab/charts/',
		component: r => require.ensure([], () => r(require('./Charts.vue')), 'Lab')
	},
}
