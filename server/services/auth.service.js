import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { messages } from "../messages/index.js";
import { UserModel } from "../database/models/user.model.js";

export const authenticateUserService = async (email, password) => {
  try {
    // Find the user by email, explicitly including the password
    const user = await UserModel.findOne({ 
      where: { email },
      attributes: ['id', 'name', 'email', 'role', 'password'] 
    });

    if (!user) {
      throw new Error(messages.general.USER_NOT_FOUND);
    }

    // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error(messages.general.INVALID_CREDENTIAL);
    }

    // Create a user object without the password
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // If the password is valid, generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the user object (without password) and the token
    return { token, user: userResponse };
  } catch (error) {
    throw new Error(error.message);
  }
};