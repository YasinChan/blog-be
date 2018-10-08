'use strict';

const Controller = require('egg').Controller;

const qiniu = require('qiniu');

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
}

module.exports = QiniuController;
