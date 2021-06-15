/* eslint-disable import/no-anonymous-default-export */
import { forksActions } from '.';
import { userActions } from '../auth';

import fetchDB from '../../services/fetchDB';

const getForks = async dispatch => {
  dispatch(forksActions.getForksRequest());

  try {
    const forks = await fetchDB.get(`/fork`);

    dispatch(forksActions.getForksSuccess(forks));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userActions.logoutUserSuccess());
    }

    dispatch(forksActions.getForksError(error));
  }
};

const addFork = async (item, dispatch) => {
  dispatch(forksActions.addForksRequest());

  try {
    await fetchDB.post(`/fork/create`, item);

    dispatch(forksActions.addForksSuccess());
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userActions.logoutUserSuccess());
    }

    dispatch(forksActions.addForksError(error));
  }
};
export default {
  getForks,
  addFork,
};
