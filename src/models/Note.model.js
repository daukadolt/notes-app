import { DataTypes, Model } from 'sequelize';

export default class Note extends Model {}

export const init = (sequelize) => {
    Note.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        text: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, { sequelize });
};
