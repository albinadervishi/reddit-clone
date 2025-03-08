import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import postService from "../services/PostService";
import { setPosts, setLoading, setError } from "../redux/postsSlice";
import { RootState } from "../redux/store";
import { PaginationParams } from "types";

const usePosts = (subredditId: string, params?: PaginationParams) => {
  const dispatch = useDispatch();
  const {
    items: posts,
    loading,
    error,
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const loadPosts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await postService.getAll(subredditId, params);
        dispatch(setPosts(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPosts();
  }, [dispatch, params, subredditId]);

  return { posts, loading, error };
};

export default usePosts;
