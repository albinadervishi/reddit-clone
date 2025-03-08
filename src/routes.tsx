import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Subreddits from "./pages/Subreddits/Subreddits";
import PostsList from "./pages/PostsList/PostsList";
import Post from "./pages/Post/Post";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <Subreddits />,
      },
      {
        path: "/subreddits/:subredditId/posts",
        element: <PostsList />,
      },
      {
        path: "/subreddits/:subredditId/posts/:postId",
        element: <Post />,
      },
    ],
  },
]);

export default router;
