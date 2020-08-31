'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.hasMany(models.SharedID, { onDelete: 'CASCADE' });
      Note.belongsTo(models.User);
    }
  }
  Note.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    UserId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'Note',
  });

  sequelize.Note = Note;

  return Note;
};
