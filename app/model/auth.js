'use strict';

module.exports = app => {
  const {INTEGER, STRING, DATE, TINYINT, TEXT} = app.Sequelize;

  const Auth = app.model.define('auth', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: TEXT,
      allowNull: false,
    },
    password: {
      type: TEXT,
      allowNull: false,
    },
    created_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DATE, allowNull: false, defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    freezeTableName: true,
    tableName: 'auth',
  });

  Auth.findUserByName = async function(username) {
    return await this.findOne({
      where: {
        username
      }
    })
  }

  return Auth
}