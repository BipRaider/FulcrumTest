import { createReducer } from '@reduxjs/toolkit';

import { categoriesActions } from '.';

const categories = createReducer([], {
  [categoriesActions.getCategoriesSuccess]: (_, { payload }) => payload,
});

export default categories;
