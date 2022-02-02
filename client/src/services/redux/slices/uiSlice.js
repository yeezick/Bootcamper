import { createSlice } from '@reduxjs/toolkit';

/**
 * should it be called ui or user?
 * - could handle modals? and check if user is finished editing account?
 *
 * states that the user needs
 * - their profile
 * - the projects available to show them
 * - visible mobile menu?
 *
 * actions:
 * - update the users' available projects
 * - update the users' info
 */

const initialState = {
  user: '',
  blacklisted_projects: [],
  visibleMobileMenu: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.visibleMobileMenu = !state.visibleMobileMenu;
    },
    fetchUser(state, action) {
      state.user = action.payload;
      const { interested_projects, member_of_projects, rejected_projects } = action.payload;
      state.blacklisted_projects = [
        ...interested_projects,
        ...member_of_projects,
        ...rejected_projects,
      ];
      console.log(state.user);
    },
    updateBlacklistedProjects(state, action) {
      // action.payload should just be the id of the new project to add to this array
      state.blacklisted_projects = [...state.blacklisted_projects, action.payload];
    },
  },
});

export const uiActions = uiSlice.actions;
