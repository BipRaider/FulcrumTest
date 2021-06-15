import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { isErrorAlert, isRefresh } from '../middleware';

import { userReducers } from '../redux/auth';
import { forksReducer } from './forks';
import { categoriesReducer } from './categories';
import { loaderReducer } from '../redux/loader';
import { errorReducer } from './error';

const defMidd = getDefaultMiddleware({
  serializableCheck: false,
});

const authUserPersistConfig = {
  key: 'authUser',
  storage,
  whitelist: ['accessToken'],
};

export const store = configureStore({
  reducer: {
    authUser: persistReducer(authUserPersistConfig, userReducers),
    forks: forksReducer,
    categories: categoriesReducer,
    isError: errorReducer,
    loader: loaderReducer,
  },
  middleware: [...defMidd, isRefresh, isErrorAlert],
});
export const persistor = persistStore(store);
