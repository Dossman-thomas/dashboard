import { response } from "../utils/index.js";
import { authenticateUserService } from "../services/auth.service.js"; // Import the authentication service
import jwt from "jsonwebtoken"; // Ensure you import jwt for token generation
import { messages } from "../messages/index.js"; // Import your messages


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate user
    const user = await authenticateUserService(email, password);

    // If user authentication fails, return an appropriate response
    if (!user) {
      return response(res, {
        statusCode: 401,
        message: messages.general.INVALID_CREDENTIAL,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Use your environment variable for the secret
      { expiresIn: "1h" } // Token expiration time
    );

    // Send success response
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: user, // Send the user object
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};
