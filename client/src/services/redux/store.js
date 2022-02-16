import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';
import { projectSlice } from './slices/projectSlice';
import { counterSlice } from './slices/counterSlice';
import { toolSlice } from './slices/toolSlice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    projects: projectSlice.reducer,
    counter: counterSlice.reducer,
    tools: toolSlice.reducer,
  },
});

export default store;
