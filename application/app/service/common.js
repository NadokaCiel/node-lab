const Service = require('egg').Service

class CommonService extends Service {
  async test(str) {
  	return str
  }
}

module.exports = CommonService
