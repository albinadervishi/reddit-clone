import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subreddit } from "types";

const singleSubredditSlice = createSlice({
  name: "singleSubreddit",
  initialState: {
    items: null as Subreddit | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setSingleSubreddit(state, action: PayloadAction<Subreddit>) {
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

export const { setSingleSubreddit, setLoading, setError } =
  singleSubredditSlice.actions;
export default singleSubredditSlice.reducer;
