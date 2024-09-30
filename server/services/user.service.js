// Import the user model
import { UserModel } from "../database/models/user.model.js";
import bcrypt from "bcrypt";

// Create a new user
export const createUserService = async (userData) => {
  try {
    const newUser = await UserModel.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Get a user by ID
export const getUserByIdService = async (id) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all users
export const getAllUsersService = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

// Update a user by ID
export const updateUserService = async (id, updatedData) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(updatedData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete a user by ID
export const deleteUserService = async (id) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

// Verify user password
export const verifyUserPasswordService = async (id, password) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};
