import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import shimmerReducer from "./shimmerSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    shimmer: shimmerReducer,
  },
});

export default store;
