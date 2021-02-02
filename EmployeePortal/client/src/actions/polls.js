import * as api from '../api';

export const getPolls = (token) => async (dispatch) => {
    try {
        const { data } = await api.getPolls(token);
        dispatch({ type: 'GET_POLLS', payload: data });
      } catch (error) {
        console.log(error.message);
      }
  }
  