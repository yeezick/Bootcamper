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
  projects: [],
  isLoaded: false,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjects(state, action) {
      state.projects = action.payload;
      state.isLoaded = true;
    },
    createProject(state, action) {
      // when a user creates a project, their project should be added to
    },
  },
});

export const projectActions = projectSlice.actions;
