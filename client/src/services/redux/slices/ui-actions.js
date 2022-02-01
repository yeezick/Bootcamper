import { uiActions } from './ui-slice';
import { signIn } from '../../api/users';

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await signIn(userData);
      console.log('userData', res);

      dispatch(uiActions.fetchUser(res));
    } catch (error) {
      console.log(error);
    }
  };
};
