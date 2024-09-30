import { DataTypes } from 'sequelize';
import sequelize from '../../config/index.js';
import bcrypt from 'bcrypt';

// User model
export const UserModel = sequelize.define('users', {
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
        validate: {
            isEmail: true, 
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'data manager', 'employee'),
        allowNull: false,
    },
}, {
    timestamps: true, // Enable createdAt and updatedAt
});

// Hashing the password before saving it to the database
UserModel.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Hash password before updating if it has changed
UserModel.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

// Password verification method
UserModel.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};