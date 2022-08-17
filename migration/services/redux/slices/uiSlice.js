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
  finishedRegistration: false,
  editMode: false,
  user: '',
  visibleMobileMenu: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.visibleMobileMenu = !state.visibleMobileMenu;
    },
    toggleEditMode(state, action) {
      switch (action.payload) {
        case true:
          state.editMode = true;
          break;

        default:
          state.editMode = false;
          break;
      }
    },
    updateUser(state, action) {
      if (action.payload) {
        const { about, interested_projects, member_of_projects, rejected_projects, role } =
          action.payload;
        if (about && role) {
          state.finishedRegistration = true;
        }
        state.user = action.payload;
        state.blacklisted_projects = [
          ...interested_projects,
          ...member_of_projects,
          ...rejected_projects,
        ];
      }
    },
    resetUser(state) {
      state.user = '';
    },
  },
});

export const uiActions = uiSlice.actions;
