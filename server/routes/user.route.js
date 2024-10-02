import { Router } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyUserPassword,
} from "../controllers/index.js";

export const userRouter = Router();

// Create a new user route
userRouter.post('/create-new', createUser); // endpoint: /api/users/create-new

// Get a user by ID route
userRouter.get('/:id', getUserById); // endpoint: /api/users/:id

// Get all users route
userRouter.get('/', getAllUsers); // endpoint: /api/users

// Update a user by ID route
userRouter.put('/update/:id', updateUser); // endpoint: /api/users/update/:id

// Delete a user by ID route
userRouter.delete('/delete/:id', deleteUser); // endpoint: /api/users/delete/:id

// Verify user password route
userRouter.post('/:id/verify-password', verifyUserPassword); // endpoint: /api/users/:id/verify-password