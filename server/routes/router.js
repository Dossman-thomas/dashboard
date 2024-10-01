import { Router } from 'express';
import { userRouter } from './user.route.js';

export const routes = Router(); // create a new router

routes.use('/users', userRouter); // add the userRouter to the routes