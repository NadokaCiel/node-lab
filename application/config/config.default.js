'use strict';

const path = require('path')

module.exports = appInfo => {
	const config = exports = {}

	config.static = {
		prefix: '/',
		dir: path.join(appInfo.baseDir, 'app/public'),
		alias: {
			'/': '/index.html'
		}
	}

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_nadoka'

	// add your config here
	config.middleware = []

	config.mongoose = {
		url: 'mongodb://localhost:27017/ciel',
		options: {}
	}

	config.redis = {
		client: {
			host: '127.0.0.1',
			port: 6379,
			password: '',
			db: '0',
		},
		agent: true,
	}

	config.security = {
		csrf: {
			enable: false,
		}
	}

	return config
}
