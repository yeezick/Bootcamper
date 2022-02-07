import { uiActions } from './uiSlice';
import { signIn, signUp, updateUser } from '../../api/users';

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

export const addRejectedProject = (userId, userUpdate) => {
  return async (dispatch) => {
    try {
      const res = await updateUser(userId, userUpdate);
      dispatch(uiActions.fetchUser(res));
    } catch (error) {
      console.log(error);
    }
  };
};
