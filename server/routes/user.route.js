import { Router } from "express";
import { authenticateJWT } from "../middleware/jwt.auth.js";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/index.js";

export const userRouter = Router();

// Create a new user route
userRouter.post('/create-new', authenticateJWT, createUser); // endpoint: /api/users/create-new

// Get a user by ID route
userRouter.get('/:id', authenticateJWT, getUserById); // endpoint: /api/users/:id

// Get all users route
userRouter.get('/', authenticateJWT, getAllUsers); // endpoint: /api/users

// Update a user by ID route
userRouter.put('/update/:id', authenticateJWT, updateUser); // endpoint: /api/users/update/:id

// Delete a user by ID route
userRouter.delete('/delete/:id', authenticateJWT, deleteUser); // endpoint: /api/users/delete/:id

// Fetch current User
userRouter.get('/current-user/:id', authenticateJWT, getCurrentUser); // endpoint: /api/users/current-user/:id

// // Login user route
// userRouter.post('/login', loginUser); // endpoint: /api/users/login

// // Verify user password route
// userRouter.post('/:id/verify-password', verifyUserPassword); // endpoint: /api/users/:id/verify-password