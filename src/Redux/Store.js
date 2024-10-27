// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./collapse";
import selectedReducer from "./Selected";
const store = configureStore({
  reducer: {
    isCollapsed: collapseReducer,
    selected: selectedReducer,
  },
});

export default store;
