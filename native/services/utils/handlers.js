// import { updateUser } from '../api/users';
// import { uiActions } from '../redux/slices/uiSlice';
// import { useDispatch } from 'react-redux';

// const dispatch = useDispatch;

export const handleTextChange = (text, property, setterFunction) => {
  setterFunction((state) => {
    return { ...state, [property]: text };
  });
};
/**
 * function is located in: [EditProfile, ]
 * would be nice to make this function reusable like the one above
 * BLOCKED by custom form requiring a function (this one requires args)
 */
export const handleUserUpdate = async (userID, updateBody) => {
  try {
    const res = await updateUser(userID, updateBody);
    dispatch(uiActions.updateUser(res));
  } catch (error) {
    console.error(error);
  }
};
