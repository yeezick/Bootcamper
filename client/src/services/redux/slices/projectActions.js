import { projectActions } from './projectSlice';
import { getAllProjects } from '../../api/projects';

export const fetchAllProjects = (blacklistedProjects) => {
  return async (dispatch) => {
    try {
      const res = await getAllProjects();
      dispatch(projectActions.fetchProjects({ allProjects: res, blacklistedProjects }));
    } catch (error) {
      console.log(error);
    }
  };
};
