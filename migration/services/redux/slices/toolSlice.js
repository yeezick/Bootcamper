import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTools: [],
  isLoaded: false,
}

export const toolSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    fetchTools(state, action) {
      const { allTools } = action.payload;
      state.allTools = allTools;
      state.isLoaded = true;
    }
  }
});

export const toolActions = toolSlice.actions;