import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    }
  }
});

export const { toggleSidebar } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
