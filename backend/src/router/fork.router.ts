import { Router } from 'express';

import ForkController from '../controllers/fork.controller';
import AuthController from '../controllers/auth.controller';
// import AuthValidators from '../validators/auth.validators';

const forkRouter = Router();
//GET
forkRouter.get('/', AuthController.authorize, ForkController.list);
forkRouter.get('/:id', AuthController.authorize, ForkController.one);

//POST
forkRouter.post(
  '/create',
  AuthController.authorize,
  // AuthValidators.validateCreateUser,
  ForkController.create,
);

//DELETE
forkRouter.delete('/:id', AuthController.authorize, ForkController.delete);

export default forkRouter;
