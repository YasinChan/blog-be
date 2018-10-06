'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TINYINT, TEXT } = app.Sequelize;
  const Upload = app.model.define('upload', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: STRING(20),
      allowNull: false,
    },
    hash: {
      type: STRING(20),
      allowNull: false,
    },
    description: {
      type: STRING(20),
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'upload',
  });

  return Upload;
};
