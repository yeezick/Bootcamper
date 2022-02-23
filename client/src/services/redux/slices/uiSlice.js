import { createSlice } from '@reduxjs/toolkit';

/**
 * - check if user is finished editing account?
 * - could handle modals?
 *
 * states that the user needs
 * - user data
 * - the projects available to show user
 * - visible mobile menu
 *
 * actions:
 * - toggle mobile menu
 * - toggle edit user
 * - update user data
 *
 */

const initialState = {
  blacklisted_projects: [],
  user: '',
  visibleMobileMenu: false,
  toggleEditUser: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.visibleMobileMenu = !state.visibleMobileMenu;
    },
    toggleEditUser(state) {
      state.toggleEditUser = !state.toggleEditUser;
    },
    updateUser(state, action) {
      state.user = action.payload;
      const { interested_projects, member_of_projects, rejected_projects } = action.payload;
      state.blacklisted_projects = [
        ...interested_projects,
        ...member_of_projects,
        ...rejected_projects,
      ];
    },
  },
});

export const uiActions = uiSlice.actions;
