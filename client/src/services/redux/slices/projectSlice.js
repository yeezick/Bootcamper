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
  },
});

export const projectActions = projectSlice.actions;
