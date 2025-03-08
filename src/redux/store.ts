import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./subredditsSlice";
import singleSubredditReducer from "./singleSubredditSlice";
import singlePostReducer from "./singlePostSlice";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    singleSubreddit: singleSubredditReducer,
    singlePost: singlePostReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
