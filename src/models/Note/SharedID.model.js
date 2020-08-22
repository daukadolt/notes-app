import { DataTypes, Model } from 'sequelize';

export default class SharedID extends Model {};

export const init = (sequelize) => {
    SharedID.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    }, { sequelize });
};
