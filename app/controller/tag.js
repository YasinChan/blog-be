'use strict';

const Controller = require('egg').Controller;

const nanoid = require('nanoid');

class TagController extends Controller {
  async getTags() {
    const { ctx } = this;

    const result = await ctx.model.Tag.findAll({
      raw: true,
      attributes: ['id', 'name'],
      order: [[ 'updated_at', 'DESC' ]],
    });

    ctx.body = {
      code: 0,
      message: 'success',
      result: result
    };
  }

  async updateTag() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    let tag = await ctx.model.Tag.update({
      name,
    }, {
      where: {
        id,
      },
    });
    if (tag[ 0 ] === 0) {
      // 没有 影响的 row 说明 id 不存在
      ctx.status = 200;
      ctx.body = {
        code: 20001,
        message: 'tag id not exists',
        result: {},
      };
    } else if (tag[ 0 ] === 1) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'success',
        result: {},
      };
    }
  }

  async createTag() {
    const { ctx } = this;
    const { name } = ctx.request.body;

    let id = nanoid(11);
    let tag = await ctx.model.Tag.create({
      id,
      name
    });
    tag = tag.dataValues;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: {
        id: tag.id,
        name: tag.name
      }
    };
  }
}

module.exports = TagController;
