'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  async getPostById(id) {
    const { ctx, config } = this;


    let result = await ctx.model.Post.findOneById(id);

    if (result) {
      result = result.dataValues;

      let pid = result.picture_id
      let picture = await ctx.model.Upload.findOne({
        where: {
          id: pid,
        },
        raw: true,
      })
      let tagIds = await ctx.model.PostTagRel.findAll({
        where: {
          post_id: result.id,
        },
        attributes: ['tag_id'],
      });
      let tags = []
      if (tagIds && tagIds.length) {
        for (let vv of tagIds) {
          let tagId = vv.dataValues.tag_id;
          let tag = await ctx.model.Tag.findOne({
            where: {
              id: tagId,
            },
            attributes: ['id','name'],
            raw: true,
          });
          tags.push(tag);
        }
      }
      result.tags = tags;
      result.picture = config.qiniu.prefix + '/' + picture.key
    }



    return result;
  }
}

module.exports = PostService;