import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && new Date().getTime() - user.timestamp < 24 * 60 * 60 * 1000) {
      // Check if the user data is less than 24 hours old
      return user.data;
    }
    localStorage.removeItem("user");
    return null;
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({
          data: action.payload,
          timestamp: new Date().getTime(),
        })
      ); // Save user to local storage with timestamp
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from local storage
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
