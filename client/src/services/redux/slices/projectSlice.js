import { createSlice } from '@reduxjs/toolkit';
/**
 * what belongs in the project state?
 * states:
 * - all projects
 *
 * actions:
 * -
 */

const initialState = {
  allProjects: [],
  availableProjects: [], // available to the user
  isLoaded: false,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjects(state, action) {
      const { blacklistedProjects, allProjects } = action.payload;
      // console.log('action', action.payload);
      state.allProjects = allProjects;

      if (blacklistedProjects.length > 0) {
        const projectsAvailableToUser = allProjects.filter(
          (project) => blacklistedProjects.includes(project._id) === false
        );

        state.availableProjects = projectsAvailableToUser;
      } else {
        state.availableProjects = allProjects;
      }

      // console.log('available', state.availableProjects);
      state.isLoaded = true;
    },
    updateBlacklistedProject(state, action) {
      console.log('payload', action);
      state.availableProjects = state.allProjects.filter(
        (project) => action.payload.includes(project._id) === false
      );
    },
  },
});

export const projectActions = projectSlice.actions;
