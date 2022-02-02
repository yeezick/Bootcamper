import { uiActions } from './uiSlice';
import { signIn, signUp } from '../../api/users';

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await signIn(userData);
      dispatch(uiActions.fetchUser(res));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signUpUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await signUp(userData);
      dispatch(uiActions.fetchUser(res));
    } catch (error) {
      console.log(error);
    }
  };
};
