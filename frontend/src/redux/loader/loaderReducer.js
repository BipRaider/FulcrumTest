import { createReducer } from '@reduxjs/toolkit';

import { userActions } from '../auth';
import { forksActions } from '../forks';

import loaderAction from './loaderActions';

const loader = createReducer(false, {
  [loaderAction.endLoader]: () => false,

  [userActions.loginUserError]: () => true,
  [userActions.loginUserRequest]: () => true,
  [userActions.loginUserSuccess]: () => false,

  [userActions.registerUserError]: () => true,
  [userActions.registerUserRequest]: () => true,
  [userActions.registerUserSuccess]: () => false,

  [userActions.logoutUserError]: () => true,
  [userActions.logoutUserRequest]: () => true,
  [userActions.logoutUserSuccess]: () => false,

  [userActions.currentUserError]: () => true,
  [userActions.currentUserRequest]: () => true,
  [userActions.currentUserSuccess]: () => false,

  [forksActions.fetchProductError]: () => true,
  [forksActions.fetchProductRequest]: () => true,
  [forksActions.fetchProductSuccess]: () => false,

  [forksActions.removeProductError]: () => true,
  [forksActions.removeProductRequest]: () => true,
  [forksActions.removeProductSuccess]: () => false,

  [forksActions.addProductError]: () => true,
  [forksActions.addProductRequest]: () => true,
  [forksActions.addProductSuccess]: () => false,
});

export default loader;
