import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from local storage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to local storage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from local storage
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
