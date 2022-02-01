import { createSlice } from '@reduxjs/toolkit';

/**
 * should it be called ui or user?
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
  available_projects: [],
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
    },
    updateLoginForm(state, action) {
      const { email, password } = action.payload;
      state.login.email = email;
      state.login.password = password;
    },
  },
});

export const uiActions = uiSlice.actions;
