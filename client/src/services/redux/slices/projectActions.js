import { projectActions } from './projectSlice';
import { getAllProjects } from '../../api/projects';

export const fetchAllProjects = () => {
  return async (dispatch) => {
    try {
      const res = await getAllProjects();
      dispatch(projectActions.fetchProjects(res));
    } catch (error) {
      console.log(error);
    }
  };
};
