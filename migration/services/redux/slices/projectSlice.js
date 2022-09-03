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
      const { allProjects, blacklistedProjects } = action.payload;
      state.allProjects = allProjects;

      if (blacklistedProjects && blacklistedProjects.length > 0) {
        const projectsAvailableToUser = allProjects.filter(
          (project) => blacklistedProjects.includes(project._id) === false
        );
        state.availableProjects = projectsAvailableToUser;
      } else {
        state.availableProjects = allProjects;
      }

      state.isLoaded = true;
    },
    updateBlacklistedProjects(state, action) {
      state.availableProjects = state.allProjects.filter(
        (project) => action.payload.includes(project._id) === false
      );
    },
  },
});

export const projectActions = projectSlice.actions;
