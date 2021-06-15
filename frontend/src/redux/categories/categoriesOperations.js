/* eslint-disable import/no-anonymous-default-export */
import { categoriesActions } from '.';
import { userActions } from '../auth';
import fetchDB from '../../services/fetchDB';

const getCategories = async dispatch => {
  dispatch(categoriesActions.getCategoriesRequest());

  try {
    const forks = await fetchDB.get(`/categories`);

    dispatch(categoriesActions.getCategoriesSuccess(forks));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userActions.logoutUserSuccess());
    }

    dispatch(categoriesActions.getCategoriesError(error));
  }
};

const addCategories = async (item, dispatch) => {
  dispatch(categoriesActions.addCategoriesRequest());

  try {
    await fetchDB.post(`/categories/create`, item);

    dispatch(categoriesActions.addCategoriesSuccess());
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userActions.logoutUserSuccess());
    }

    dispatch(categoriesActions.addCategoriesError(error));
  }
};

export default {
  getCategories,
  addCategories,
};
