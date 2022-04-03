import { uiActions } from '../slices/uiSlice';
import { projectActions } from '../slices/projectSlice';
import { updateUser } from '../../api/users';

export const addRejectedProject = (userId, userUpdate, blacklistedProjects) => {
  return async (dispatch) => {
    try {
      const res = await updateUser(userId, userUpdate);
      dispatch(uiActions.updateUser(res));
      dispatch(projectActions.updateBlacklistedProjects(blacklistedProjects));
    } catch (error) {
      console.log(error);
    }
  };
};

/*          DEPRECATED:
- sign in screen does not track state change
- no way to handle unsuccessful login without having to call with `verify()`

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await signIn(userData);
      dispatch(uiActions.updateUser(res));
      return true;
    } catch (error) {
      console.log(error);
    }
  };
};

export const signUpUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await signUp(userData);
      dispatch(uiActions.updateUser(res));
    } catch (error) {
      console.log(error);
    }
  };
};
*/
