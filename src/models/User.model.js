import { DataTypes, Model } from 'sequelize';

export default class User extends Model {}

export const init = (sequelize) => {
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.NUMBER,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^\w{3,}/,
            },
        },
    }, { sequelize });
};
