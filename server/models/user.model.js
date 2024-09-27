import { DataTypes } from 'sequelize';
import sequelize from '../config/index.js';
import bcrypt from 'bcrypt';

// User model

export const UserModel =  sequelize.define('users', {
    id: {
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
        type: DataTypes.ENUM('admin', 'data manager', 'employee'), // Enum is a string object with a value chosen from a list of permitted values that are enumerated explicitly in the column definition.
        allowNull: false, 
    },
});

// Hashing the password before saving it to the database
UserModel.beforeCreate(async (user) => { 
    user.password = await bcrypt.hash(user.password, 10); // 10 is the salt round - the higher the number, the more secure the password.
});