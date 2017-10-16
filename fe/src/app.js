import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import EleConfig from './config/element'
// import ElementUI from 'element-ui'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import * as filters from './filters'
import data from './store'
import router from './router'

import {ajax} from './lib/ajax'
import _ from "lodash"
import "babel-polyfill"

import 'flex.css'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome.css'
import './style/common.less'

//For Offline Support
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()


Vue.use(Vuex)
Vue.use(Router)
// Vue.use(ElementUI)
Vue.prototype.$ajax = ajax

//注册全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

const store = new Vuex.Store(data)

const app = new Vue({
	store,
	router,
	el: '#app',
	render: h => h(App)
})
