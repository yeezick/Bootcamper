import { projectActions, updateBlacklistedProjects } from '../slices/projectSlice';
import { getAllProjects, updateUserAndProject } from '../../api/projects';
import { uiActions } from '../slices/uiSlice';

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

export const showInterestInRoulette = (reqBody, blacklistedProjects) => {
  return async (dispatch) => {
    try {
      const { user } = await updateUserAndProject(reqBody);
      dispatch(uiActions.updateUser(user));
      dispatch(projectActions.updateBlacklistedProjects(blacklistedProjects));
    } catch (error) {
      console.log(error);
    }
  };
};
