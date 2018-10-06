'use strict';

module.exports = app => {
  const {INTEGER, STRING, DATE, TINYINT, TEXT} = app.Sequelize;

  const Note = app.model.define('note', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'note',
  });


  return Note
}