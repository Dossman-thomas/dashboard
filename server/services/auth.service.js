import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { messages } from "../messages/index.js";
import { response } from "../utils/index.js";
import { UserModel } from "../database/models/user.model.js";

export const authenticateUserService = async (email, password) => {
  try {

    const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"; // Use the environment variable JWT_SECRET or a default value

    // Find the user by email
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
        return response(res, {
          statusCode: 404,
          message: messages.general.USER_NOT_FOUND,
        });
      }

    // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return response(res, {
        statusCode: 401,
        message: messages.general.INVALID_CREDENTIAL,
      });
    }

    // If the password is valid, generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Payload (you can customize this)
      process.env.JWT_SECRET, // Secret key (make sure to add this in your .env file)
      { expiresIn: "1h" } // Token expiration
    );

    // Return the user object and the token
    return response(res, {
        statusCode: 200,
        message: messages.general.SUCCESS,
        data: { token, user },
      });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};
