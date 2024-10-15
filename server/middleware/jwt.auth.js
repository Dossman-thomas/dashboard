import jwt from "jsonwebtoken";
import { response } from "../utils/index.js";
import { messages } from "../messages/index.js";

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return response(res, {
        statusCode: 403,
        message: messages.general.UNAUTHORIZED,
      });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return response(res, {
          statusCode: 403,
          message: messages.general.UNAUTHORIZED,
        });
      }
  
      // Add user information to the request object
      req.user = user;
      next();
    });
  };
  