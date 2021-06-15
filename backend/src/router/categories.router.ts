import { Router } from 'express';

import CategoriesController from '../controllers/categories.controller';
import AuthController from '../controllers/auth.controller';
// import AuthValidators from '../validators/auth.validators';

const categoriesRouter = Router();
//GET
categoriesRouter.get('/', AuthController.authorize, CategoriesController.list);
categoriesRouter.get('/:id', AuthController.authorize, CategoriesController.one);
//POST
categoriesRouter.post(
  '/create',
  AuthController.authorize,
  // AuthValidators.validateCreateUser,
  CategoriesController.create,
);

//DELETE;
categoriesRouter.delete('/:id', AuthController.authorize, CategoriesController.delete);

export default categoriesRouter;
