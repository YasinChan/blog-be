'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TINYINT, TEXT } = app.Sequelize;
  const PostTagRel = app.model.define('post_tag_rel', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_id: {
      type: INTEGER,
      allowNull: false,
    },
    post_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'post_tag_rel',
  });

  PostTagRel.findPostsIdByTagId = async function(tag_id) {
    return await this.findAll({
      where: {
        tag_id,
      },
      attributes: ['post_id'],
    });
  };

  PostTagRel.findTagIdsByPostId = async function(post_id) {
    return await this.findAll({
      where: {
        post_id,
      },
      attributes: ['tag_id'],
    });
  };

  return PostTagRel;
};
