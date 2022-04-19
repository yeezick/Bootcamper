/**
 * @func handleTextChange
 * @author Erick Manrique <erickmanriqpro@gmail.com>
 * @desc This function replaces multi-line updates to objects in state with a one-line function call that receives the new value, property name, and value.
 * @param {String} value The new value to replace the existing one in state.
 * @param {String} property The name of the property who's value will get replaced.
 * @param {Function} setterFunction The setter function that will fetch and update its respective object in state.
 * @constraint All arguments must belong to an existing OBJECT in state.
 */
// TODO: rename this function to 'handleObjectChange'
export const handleTextChange = (value, property, setterFunction) => {
  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};

export const handleToggle = (setterFunction) => {
  setterFunction((currState) => !currState);
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
