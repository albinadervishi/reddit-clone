import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import subredditService from "../services/SubbredditService";
import { fetchData, setLoading, setError } from "../redux/subredditsSlice";
import { RootState } from "../redux/store";
import { PaginationParams } from "../types";

const useSubreddits = (params?: PaginationParams) => {
  const dispatch = useDispatch();
  const {
    items: subreddits,
    loading,
    error,
  } = useSelector((state: RootState) => state.subreddits);

  useEffect(() => {
    if (subreddits.length > 0 && params?.page === 1) return;

    const fetch = async () => {
      dispatch(setLoading(true));

      try {
        const data = await subredditService.getAll(params);
        const limitedData = params?.limit ? data.slice(0, params.limit) : data;

        dispatch(
          fetchData({
            data: limitedData,
            page: params?.page || 1,
          })
        );
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch")
        );
      }
    };

    fetch();
  }, [dispatch, params?.page, params?.limit, subreddits.length]);

  return { subreddits, loading, error };
};

export default useSubreddits;
