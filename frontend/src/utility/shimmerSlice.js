    import { createSlice } from "@reduxjs/toolkit";

const shimmerSlice = createSlice({
  name: "shimmer",
  initialState: {
    shimer: true,
  },
  reducers: {
    showShimmer: (state) => {
      state.shimer = true;
    },
    hideShimmer: (state) => {
      state.shimer = false;
    },
  },
});

export const { showShimmer, hideShimmer } = shimmerSlice.actions;
export default shimmerSlice.reducer;
