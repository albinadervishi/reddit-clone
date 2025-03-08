import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState: {
    items: null as Post | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setSinglePost(state, action: PayloadAction<Post>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSinglePost, setLoading, setError } = singlePostSlice.actions;
export default singlePostSlice.reducer;
