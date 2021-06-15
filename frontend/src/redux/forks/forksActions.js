/* eslint-disable import/no-anonymous-default-export */
import { createAction } from '@reduxjs/toolkit';

const getForksRequest = createAction('forks/getRequest');
const getForksSuccess = createAction('forks/getSuccess');
const getForksError = createAction('forks/getError');

const addForksRequest = createAction('forks/addRequest');
const addForksSuccess = createAction('forks/addSuccess');
const addForksError = createAction('forks/addError');

export default {
  getForksRequest,
  getForksSuccess,
  getForksError,

  addForksRequest,
  addForksSuccess,
  addForksError,
};
