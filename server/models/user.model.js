import { DataTypes } from 'sequelize';
import sequelize from '../config/index.js';

export const UserModel =  sequelize.define('users', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
});