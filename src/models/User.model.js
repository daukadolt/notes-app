import { DataTypes, Model } from 'sequelize';

import utils from '../utils';

export default class User extends Model {}

export const init = (sequelize) => {
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
    }, { sequelize });

    User.addHook('beforeCreate', async (user) => {
        const hashedPassword = await utils.getPasswordHash(user.getDataValue('password'));
        user.setDataValue('password', hashedPassword);
    });
};
