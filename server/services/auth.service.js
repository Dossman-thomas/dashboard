import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { messages } from "../messages/index.js";
import { UserModel } from "../database/models/user.model.js";

export const authenticateUserService = async (email, password) => {
  try {
    // Find the user by email
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new Error(messages.general.USER_NOT_FOUND); // Throw error if user not found
    }

    // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error(messages.general.INVALID_CREDENTIAL); // Throw error if credentials are invalid
    }

    // If the password is valid, generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "1h" } // Token expiration
    );

    // Return the user object and the token
    return { token, user }; // Return token and user object
  } catch (error) {
    throw new Error(error.message); // Throw error for handling in the controller
  }
};
