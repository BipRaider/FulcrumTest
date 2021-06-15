/* eslint-disable import/no-anonymous-default-export */
'use strick';

import { createAction } from '@reduxjs/toolkit';

const getCategoriesRequest = createAction('categories/getRequest');
const getCategoriesSuccess = createAction('categories/getSuccess');
const getCategoriesError = createAction('categories/getError');

const addCategoriesRequest = createAction('categories/addRequest');
const addCategoriesSuccess = createAction('categories/addSuccess');
const addCategoriesError = createAction('categories/addError');

export default {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesError,

  addCategoriesRequest,
  addCategoriesSuccess,
  addCategoriesError,
};
