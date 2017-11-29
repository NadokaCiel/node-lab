const crypto = require('crypto')

module.exports = app => {
  class CustomController extends app.Controller {

    async repackList(modelName, select, getAll) {

      const {
        query,
        model
      } = this.ctx

      let size = Number(query.size) || 10
      let page = query.page || 1
      let offset = Number((page - 1) * size)
      let filter = select || ''

      if(!getAll) {
        filter += " -_id -__v"
      }

      if (!model || !model[modelName]) {
        return this.error('no such resource！')
      }

      const doc = model[modelName]

      try {
        const arr = await doc.find().select(filter).skip(offset).limit(size)
        const count = await doc.count()
        this.success(this.makeList(arr, count))
      } catch (err) {
        this.error(err)
      }
    }

    async getId(type) {

      const { Ids } = this.ctx.model
      try {
        const idData = await Ids.findOne()
        if (!idData[type] && idData[type] !== 0) {
          const newIds = {}
          newIds[type] = 0
          await Ids.update({}, {
            $set: newIds
          }, {
            multi: 1
          })
        }
        idData[type]++
        await idData.save()
        return idData[type]
      } catch (err) {
        throw new Error(err)
        return
      }
    }

    success(data) {

      if (!data) {
        return this.error('The data you requested does not exist.')
      }

      this.ctx.body = {
        status: 'success',
        data
      }
    }

    error(massage) {

      this.ctx.body = {
        status: 'error',
        massage: massage || 'Unknown error.'
      }
    }

    unauthorized(massage) {

      this.ctx.body = {
        status: 'unauthorized',
        massage: massage || 'Please login before your further operation.'
      }
    }

    makeList(arr, count) {

      return {
        list: arr,
        total: count
      }
    }

    encryption(password) {
      if (password.length < 4) {
        return this.Md5(password)
      }
      const newpassword = this.Md5(this.Md5(password).substr(2, 4) + this.Md5(password))
      return newpassword
    }

    Md5(password) {
      const md5 = crypto.createHash('md5')
      return md5.update(password).digest('base64')
    }

  }
  app.BaseController = CustomController

}
