'use strict';
const {
  Model
} = require('sequelize');

import utils from '../../../utils';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Note, { onDelete: 'CASCADE' });
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^\w{3,}/,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.CHAR(60),
    },
    jwtValidFrom: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', async (user) => {
    const hashedPassword = await utils.getPasswordHash(user.getDataValue('password'));
    user.setDataValue('password', hashedPassword);
  });

  return User;
};
