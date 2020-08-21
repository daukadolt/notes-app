import { DataTypes, Model } from 'sequelize';

import utils from '../utils';
import Note from './Note.model';

export default class User extends Model {}

export const init = (sequelize) => {
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
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

    User.hasMany(Note);
};
