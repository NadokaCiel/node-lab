'use strict';

const serve = require('koa-static-server')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  require('./router/user')(app)
  app.use(serve({rootDir: 'app/public', rootPath: '/'}))
};
