import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import subredditService from "../services/SubbredditService";
import {
  setSingleSubreddit,
  setLoading,
  setError,
} from "../redux/singleSubredditSlice";
import { RootState } from "redux/store";

const useSingleSubreddit = (id: string) => {
  const dispatch = useDispatch();
  const {
    items: subreddit,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleSubreddit);

  useEffect(() => {
    const loadSubreddit = async () => {
      dispatch(setLoading(true));
      try {
        const data = await subredditService.getById(id);
        dispatch(setSingleSubreddit(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadSubreddit();
  }, [dispatch, id]);

  return { subreddit, loading, error };
};

export default useSingleSubreddit;
