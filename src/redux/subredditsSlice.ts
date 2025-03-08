import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subreddit } from "types";

const initialState = {
  items: [] as Subreddit[],
  allItems: [] as Subreddit[],
  loading: false,
  error: null as string | null,
  page: 1,
  hasMore: true,
  scrollY: 0,
};

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    fetchData: (
      state,
      action: PayloadAction<{ data: Subreddit[]; page: number }>
    ) => {
      const { data, page } = action.payload;
      state.items = data;
      state.loading = false;
      state.hasMore = data.length === 10;

      if (data.length > 0) {
        const existingIds = new Set(state.allItems.map((item) => item.id));
        const newItems = data.filter((item) => !existingIds.has(item.id));
        if (newItems.length > 0) {
          state.allItems = [...state.allItems, ...newItems];
        }
      }

      state.page = page;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    nextPage: (state) => {
      state.page += 1;
    },

    saveScroll: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },

    reset: () => initialState,
  },
});

export const { fetchData, setLoading, setError, nextPage, saveScroll, reset } =
  subredditsSlice.actions;

export default subredditsSlice.reducer;
