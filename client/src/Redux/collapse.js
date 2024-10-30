import { createSlice } from "@reduxjs/toolkit";
const collapseSlice = createSlice({
  name: "sidebarCollapse",
  initialState: {
    collapsed: false,
  },
  reducers: {
    isSidebarCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { isSidebarCollapsed } = collapseSlice.actions;
export default collapseSlice.reducer;
