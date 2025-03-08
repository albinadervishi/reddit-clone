import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [] as Post[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
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

export const { setPosts, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
