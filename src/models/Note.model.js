import { DataTypes, Model } from 'sequelize';

export default class Note extends Model {}

export const init = (sequelize) => {
    Note.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        text: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, { sequelize });
};
