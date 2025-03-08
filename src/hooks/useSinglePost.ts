import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import postService from "../services/PostService";
import { setSinglePost, setLoading, setError } from "../redux/singlePostSlice";
import { RootState } from "../redux/store";

const useSinglePost = (subredditId: string, id: string) => {
  const dispatch = useDispatch();
  const {
    items: post,
    loading,
    error,
  } = useSelector((state: RootState) => state.singlePost);

  useEffect(() => {
    const loadPost = async () => {
      dispatch(setLoading(true));
      try {
        const data = await postService.getById(subredditId, id);
        dispatch(setSinglePost(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPost();
  }, [dispatch, id, subredditId]);

  return { post, loading, error };
};

export default useSinglePost;
