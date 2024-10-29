import { messages } from "../messages/index.js";
import { response } from "../utils/index.js";
import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  authenticateUserService,
} from "../services/index.js";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"; 

// Login user
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await authenticateUserService(email, password);


//     console.log(user.id); 

//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h", // token expires in 1 hour
//     });


//   } catch (error) {
//     console.error(error);
//     return response(res, {
//       statusCode: 500,
//       message: messages.general.INTERNAL_SERVER_ERROR,
//     });
//   }
// };

export const getCurrentUser = async (req, res) => {
  try {

    console.log(req.params.id);
    
    // Fetch the user by ID
    const user = await getUserByIdService(req.params.id); // req.user is set by the authenticateJWT middleware
    
    if (!user) {
      return response(res, {
        statusCode: 404,
        message: messages.general.USER_NOT_FOUND,
      });
    }

    // Respond with the current user's details
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    return response(res, {
      statusCode: 201,
      message: messages.general.SUCCESS,
      data: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return response(res, {
        statusCode: 400,
        message: messages.general.VALIDATION_ERROR,
      });
    }

    // Log the error for debugging
    console.error(error);

    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return response(res, {
        statusCode: 404,
        message: messages.general.USER_NOT_FOUND,
      });
    }
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// Get all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await getAllUsersService();
//     return response(res, {
//       statusCode: 200,
//       message: messages.general.SUCCESS,
//       data: users,
//     });
//   } catch (error) {
//     console.error(error);
//     return response(res, {
//       statusCode: 500,
//       message: messages.general.INTERNAL_SERVER_ERROR,
//     });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      searchQuery = "", 
      sortBy = "createdAt", 
      order = 'DESC',
    } = req.query;
    const users = await getAllUsersService({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      searchQuery,
      sortBy,
      order,
    });
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    if (!updatedUser) {
      return response(res, {
        statusCode: 404,
        message: messages.general.USER_NOT_FOUND,
      });
    }
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return response(res, {
        statusCode: 400,
        message: messages.general.VALIDATION_ERROR,
      });
    }

    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) {
      return response(res, {
        statusCode: 404,
        message: messages.general.USER_NOT_FOUND,
      });
    }
    return response(res, {
      statusCode: 200,
      message: messages.general.USER_DELETED_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};

// Verify user password
export const verifyUserPassword = async (req, res) => {
  try {
    const user = await authenticateUserService(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return response(res, {
        statusCode: 401,
        message: messages.general.INVALID_CREDENTIALS,
      });
    }
    return response(res, {
      statusCode: 200,
      message: messages.general.SUCCESS,
    });
  } catch (error) {
    console.error(error);
    return response(res, {
      statusCode: 500,
      message: messages.general.INTERNAL_SERVER_ERROR,
    });
  }
};
