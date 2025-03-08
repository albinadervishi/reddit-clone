import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentService from "../services/CommentServices";
import { setComments, setLoading, setError } from "../redux/commentsSlice";
import { RootState } from "../redux/store";
import { PaginationParams } from "types";

const useComments = (
  subredditId: string,
  postId: string,
  params?: PaginationParams
) => {
  const dispatch = useDispatch();
  const {
    items: comments,
    loading,
    error,
  } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    const loadComments = async () => {
      dispatch(setLoading(true));
      try {
        const data = await commentService.getAll(subredditId, postId, params);
        dispatch(setComments(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadComments();
  }, [dispatch, params, subredditId, postId]);

  return { comments, loading, error };
};

export default useComments;
