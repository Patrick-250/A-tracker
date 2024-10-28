import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./collapse";
import selectedReducer from "./Selected";
import authReducer from "./auth"; // Import the auth reducer

const store = configureStore({
  reducer: {
    isCollapsed: collapseReducer,
    selected: selectedReducer,
    auth: authReducer, // Add the auth reducer
  },
});

export default store;
