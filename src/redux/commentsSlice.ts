import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "types";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [] as Comment[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
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

export const { setComments, setLoading, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
