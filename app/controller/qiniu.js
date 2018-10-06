'use strict';

const Controller = require('egg').Controller;

const qiniu = require('qiniu');
const nanoid = require('nanoid');

class QiniuController extends Controller {
  async getUptoken() {
    const { ctx, config } = this;

    const accessKey = config.qiniu.AccessKey;
    const secretKey = config.qiniu.SecretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const options = {
      scope: config.qiniu.bucketName,
      expires: 7200
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken=  putPolicy.uploadToken(mac);

    ctx.body = uploadToken;
  }

  async saveupload() {
    const { ctx } = this;
    console.log(ctx.request.body);
    let id = nanoid(11);
    const item = await ctx.model.Upload.create({
      id: id,
      hash: ctx.request.body.hash,
      key: ctx.request.body.key,
      description: ''
    });
    console.log(item);
    ctx.body = {
      code: 0,
      message: 'success',
      result: item
    };
  }
}

module.exports = QiniuController;
