// Import the user model
import { UserModel } from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import { pagination } from "../utils/common.util.js";
import { Op } from "sequelize";

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



// // Get all users
// export const getAllUsersService = async () => {
//   try {
//     const users = await UserModel.findAll();
//     return users;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// Get all users with pagination
export const getAllUsersService = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order, 
}) => {
  try {
    const users = await UserModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } }, // search by name
          { email: { [Op.like]: `%${searchQuery}%` } }, // search by email
        ],
      },
      order: [[sortBy, order]], // sort by the specified field and order
      ...pagination({ page, limit }), // use pagination function to limit results
    });

    return users;
  } catch (error) {
    throw new Error(error.message);
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
export const authenticateUserService = async (email, password) => {
  try {
    // Find the user by email (instead of id)
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);

    // If the password is valid, return the user object
    if (isValid) {
      return user;
    } else {
      // If the password is invalid, return null
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};
