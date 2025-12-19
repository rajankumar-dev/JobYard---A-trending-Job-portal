import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";

const store = configureStore({
  reducer: {
    // Add reducers
    alerts: alertSlice.reducer,
  },
});

export default store;
