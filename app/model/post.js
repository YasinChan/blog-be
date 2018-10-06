'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TINYINT, TEXT } = app.Sequelize;
  const Post = app.model.define('post', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(20),
      allowNull: false,
    },
    preview: {
      type: TEXT,
      allowNull: false,
    },
    markdown: {
      type: TEXT,
      allowNull: false,
    },
    rendered: {
      type: TEXT,
      allowNull: false,
    },
    picture_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'post',
  });

  Post.findOneById = async function(id) {
    return await this.findOne({
      where: {
        id,
      },
    });
  };

  Post.getAll = async function () {   // 获取文章列表
    let posts = await this.findAll({
      raw: true,
    });

    for (let v of posts) {
      let pid = v.picture_id
      let picture = await app.model.Upload.findOne({
        where: {
          id: pid,
        },
        raw: true,
      })
      let tagIds = await app.model.PostTagRel.findAll({
        where: {
          post_id:v.id,
        },
        attributes: ['tag_id'],
      });
      let tags = []
      if (tagIds && tagIds.length) {
        for (let vv of tagIds) {
          let tagId = vv.dataValues.tag_id;
          let tag = await app.model.Tag.findOne({
            where: {
              id: tagId,
            },
            attributes: ['id','name'],
            raw: true,
          });
          tags.push(tag);
        }
      }
      delete v.picture_id
      v.tags = tags;
      v.picture = app.config.qiniu.prefix + '/' + picture.key
    }
    return posts
  };

  return Post;
};
