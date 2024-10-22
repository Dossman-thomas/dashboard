import jwt from "jsonwebtoken";
import { response } from "../utils/index.js";
import { messages } from "../messages/index.js";

// Use the environment variable JWT_SECRET or a default value
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"; 

export const authenticateJWT = (req, res, next) => {
    // Get the Authorization header and split it to get the token
    const authHeader = req.headers['authorization'];

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     // Return 401 if no token is provided or the format is incorrect
    //     return response(res, {
    //         statusCode: 401,
    //         message: messages.general.UNAUTHORIZED, // 401 Unauthorized for missing/incorrect format
    //     });
    // }


    // Extract the token from the Bearer token format
    const token = authHeader.split(" ")[1];

    console.log('Token:', token); // Log the token for debugging

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {


        if (err) {
            console.error("JWT Verification Error:", err); // Log the error for debugging
            // Return 403 if the token is invalid or expired
            return response(res, {
                statusCode: 401,
                message: messages.general.UNAUTHORIZED, // 401 Unauthorized for invalid/expired token
            });
        }

        console.log('Decoded user from token:', user); // check user details from token
        // Attach the decoded user object to the request
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    });
};
