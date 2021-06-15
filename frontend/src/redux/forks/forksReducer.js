import { createReducer } from '@reduxjs/toolkit';

import { forksActions } from '.';

const forks = createReducer([], {
  [forksActions.getForksSuccess]: (_, { payload }) => payload,
});

export default forks;
