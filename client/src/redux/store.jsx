import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { authSlice } from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    // Add reducers
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
