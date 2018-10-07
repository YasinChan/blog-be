'use strict';

const Controller = require('egg').Controller;

const nanoid = require('nanoid');

class PostController extends Controller {
  async index() {
    const { ctx } = this;

    const result = await ctx.model.Post.getAll();
    ctx.body = {
      code: 0,
      message: 'success',
      result: result
    };
  }

  async getPostById() {
    const { ctx } = this;
    const id = ctx.params.id;
    let result = await ctx.service.post.getPostById(id);
    ctx.body = {
      code: 0,
      message: 'success',
      result: result
    };
  }

  async create() {
    const { ctx } = this;
    const { title, preview, markdown, rendered, picture_id, created_at, updated_at } = ctx.request.body;

    let pid = picture_id || 'default1';

    let id = nanoid(11);
    let post = await ctx.model.Post.create({
      id,
      title,
      preview,
      markdown,
      rendered,
      picture_id: pid,
      created_at,
      updated_at
    });
    post = post.dataValues;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: {
        data: {
          post_id: post.id,
        },
      },
    };
  }

  async updatePostById() {
    const { ctx } = this;
    const { id, title, preview, markdown, rendered, picture_id, created_at, updated_at } = ctx.request.body;

    const post = await ctx.model.Post.update({
      title,
      preview,
      markdown,
      rendered,
      picture_id,
      created_at,
      updated_at
    }, {
      where: {
        id,
      },
    });

    if (post[ 0 ] === 0) {
      // 没有 影响的 row 说明 id 不存在
      ctx.status = 200;
      ctx.body = {
        code: 20001,
        message: 'post id not exists',
        result: {},
      };
    } else if (post[ 0 ] === 1) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'success',
        result: {},
      };
    }
  }

  async updateTagByPostId() {
    const { ctx } = this;
    const { post_id, tag_id } = ctx.request.body;

    await ctx.model.PostTagRel.destroy({
      where: {
        post_id
      }
    })

    let arr = []
    for (let i=0; i<tag_id.length; i++) {
      arr.push({post_id: post_id, tag_id: tag_id[i]})
    }

    await ctx.model.PostTagRel.bulkCreate(arr)

    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: "更新成功",
    };
  }

  async deletePostById() {
    const { ctx } = this;
    const id = ctx.params.id;

    await ctx.model.Post.destroy({
      where: {
        id
      }
    })

    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: "删除成功",
    };
  }

  async getAllPostsByTagId() {
    const { ctx, config } = this;
    const tagId = ctx.params.id;

    let postIds = await ctx.model.PostTagRel.findAll({
      where: {
        tag_id: tagId,
      },
      attributes: ['post_id'],
      order: [[ 'updated_at', 'DESC' ]],
    });
    let arr = [];

    if (postIds && postIds.length) {
      for (var v of postIds) {
        let id = v.dataValues.post_id;
        let result = await ctx.service.post.getPostById(id);
        result && arr.push(result);
      }
    }

    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: arr
    };
  }
}

module.exports = PostController;
