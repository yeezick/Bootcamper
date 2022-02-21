import { toolActions } from "./toolSlice.js";
import { getAllTools } from "../../api/tools.js";

export const fetchAllTools = () => {
  return async (dispatch) => {
    try {
      const res = await getAllTools();
      dispatch(toolActions.fetchTools({ allTools: res }));
    } catch (error) {
      console.log(error);
    }
  }
}