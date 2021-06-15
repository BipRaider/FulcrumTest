import { Application } from 'express';

import auth from './auth.router';
import user from './user.router';
import fork from './fork.router';
import categories from './categories.router';

export default (app: Application): void => {
  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/fork', fork);
  app.use('/api/categories', categories);
};
