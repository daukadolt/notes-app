'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedID extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SharedID.belongsTo(models.Note);
    }
  }
  SharedID.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    NoteId: {
      type: DataTypes.UUID,
      references: {
        model: 'Notes',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'SharedID',
  });
  return SharedID;
};
