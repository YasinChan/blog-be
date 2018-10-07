'use strict';

const Controller = require('egg').Controller;



class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const auth = await ctx.model.Auth.findUserByName(username);

    if (!auth) {
      ctx.status = 401;
      ctx.body = {
        code: 10002,
        message: 'email or password wrong',
        result: {},
      };
    } else {
      if (auth.dataValues.password === password) {
        const token = ctx.service.jwt.sign({
          username: auth.dataValues.username,
          password: auth.dataValues.password
        });
        ctx.status = 200;
        ctx.body = {
          code: 0,
          message: 'success',
          result: token,
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 10002,
          message: 'email or password wrong',
          result: {},
        };
      }
    }
  }
}

module.exports = AuthController;
