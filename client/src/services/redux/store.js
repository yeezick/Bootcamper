import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';
import { projectSlice } from './slices/projectSlice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    projects: projectSlice.reducer,
  },
});

export default store;
