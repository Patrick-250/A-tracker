import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
  name: "selected",
  initialState: {
    value: "Dashboard",
  },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
