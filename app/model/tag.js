'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Tag = app.model.define('tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(20),
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'tag',
  });

  Tag.findOneById = async function(id) {
    return await this.findOne({
      where: {
        id,
      },
      attributes: ['id','name'],
      raw: true,
    });
  };

  return Tag;
};
