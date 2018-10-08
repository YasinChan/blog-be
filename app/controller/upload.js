'use strict';

const Controller = require('egg').Controller;

const nanoid = require('nanoid');

class UploadController extends Controller {

  async getUploads() {
    const { ctx, config } = this;
    const uploads = await ctx.model.Upload.findAll({
      raw: true,
      order: [[ 'updated_at', 'DESC' ]],
    });
    uploads.forEach(v => {
      v.url = config.qiniu.prefix + '/' + v.key;
    })

    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: uploads
    };
  }

  async saveupload() {
    const { ctx } = this;
    let id = nanoid(11);
    const item = await ctx.model.Upload.create({
      id: id,
      hash: ctx.request.body.hash,
      key: ctx.request.body.key,
      description: ''
    });
    console.log(item);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: item
    };
  }
}

module.exports = UploadController;
