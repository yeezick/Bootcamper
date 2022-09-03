import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    addMore(state, action) {
      console.log('action', action);
      state.count += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;
