import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import userAction from './userActions';

const INITIAL_USER_STATE = {
  email: null,
  name: null,
  id: null,
};

const userLogged = (_, { payload }) => {
  const { email, name, id } = payload;
  return { email, name, id };
};

const getCurrentUser = (_, { payload }) => {
  const { email, name, id } = payload;
  return { email, name, id };
};

const user = createReducer(INITIAL_USER_STATE, {
  [userAction.loginUserSuccess]: userLogged,
  [userAction.currentUserSuccess]: getCurrentUser,
  [userAction.logoutUserSuccess]: () => INITIAL_USER_STATE,
});

const forks = createReducer([], {
  [userAction.loginUserSuccess]: (_, { payload }) => payload.forks,
  [userAction.currentUserSuccess]: (_, { payload }) => payload.forks,
  [userAction.logoutUserSuccess]: () => {},
});

const categories = createReducer([], {
  [userAction.loginUserSuccess]: (_, { payload }) => payload.categories,
  [userAction.currentUserSuccess]: (_, { payload }) => payload.categories,
  [userAction.logoutUserSuccess]: () => {},
});

const accessToken = createReducer(null, {
  [userAction.loginUserSuccess]: (_, { payload }) => payload.accessToken,
  [userAction.refreshUserSuccess]: (_, { payload }) => payload.accessToken,
  [userAction.logoutUserSuccess]: () => null,
});

const refreshToken = createReducer(null, {
  [userAction.loginUserSuccess]: (_, { payload }) => payload.refreshToken,
  [userAction.refreshUserSuccess]: (_, { payload }) => payload.refreshToken,
  [userAction.logoutUserSuccess]: () => null,
});

const expiresIn = createReducer(null, {
  [userAction.loginUserSuccess]: (_, { payload }) => payload.expiresIn,
  [userAction.logoutUserSuccess]: () => null,
});

export default combineReducers({
  user,
  forks,
  categories,
  accessToken,
  refreshToken,
  expiresIn,
});
