// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./collapse";

const store = configureStore({
  reducer: {
    isCollapsed: collapseReducer,
  },
});

export default store;
