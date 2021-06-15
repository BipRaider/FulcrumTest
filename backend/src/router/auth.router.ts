import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import AuthValidators from '../validators/user.validators';

const authRouter = Router();

authRouter.post('/refresh', AuthController.authorize, AuthController.create);

authRouter.post('/register', AuthValidators.validateCreateUser, AuthController.register);

authRouter.post(
  '/login',
  AuthValidators.validateLogin,
  AuthController.login,
  AuthController.create,
);

authRouter.post('/logout', AuthController.authorize, AuthController.logout);
export default authRouter;
