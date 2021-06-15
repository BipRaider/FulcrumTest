import { Router } from 'express';

import UserController from '../controllers/user.controller';

import AuthController from '../controllers/auth.controller';

const userRouter = Router();

userRouter.get('/', AuthController.authorize, UserController.getUser);

export default userRouter;
