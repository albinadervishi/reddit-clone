import { FC, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSubreddits from "../../hooks/useSubreddits";
import { RootState } from "../../redux/store";
import { nextPage, saveScroll } from "../../redux/subredditsSlice";
import { Loader, Header } from "../../components";
import "./Subreddits.scss";

const Subreddits: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const { allItems, page, hasMore, scrollY, loading, error } = useSelector(
    (state: RootState) => state.subreddits
  );

  useSubreddits({ page, limit: 10 });

  //infinite scroll func
  useEffect(() => {
    //restore scroll position if returning to page
    if (allItems.length > 0 && scrollY > 0) {
      window.scrollTo(0, scrollY);
    }

    //save scroll position
    const handleScroll = () => {
      const saveScrollTimer = (window as any).saveScrollTimer;
      if (!saveScrollTimer) {
        (window as any).saveScrollTimer = setTimeout(() => {
          dispatch(saveScroll(window.scrollY));
          (window as any).saveScrollTimer = null;
        }, 500);
      }
    };

    //setup infinite scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(nextPage());
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      // @ts-ignore
      if (window.saveScrollTimer) clearTimeout(window.saveScrollTimer);
    };
  }, [dispatch, hasMore, loading, allItems.length, scrollY]);

  return (
    <div className="subreddits-container">
      <Header title="subreddits" />

      {/* <div className="subreddits-header-bar">
        <p>{allItems.length} subreddits</p>
      </div> */}

      <div className="subreddits-grid">
        {allItems.map((subreddit) => (
          <div
            key={subreddit.id}
            className="subreddit-card"
            onClick={() => navigate(`/subreddits/${subreddit.id}/posts`)}
          >
            <h2>/r/{subreddit.title}</h2>
            <p>This is the official subreddit for {subreddit.title}</p>
          </div>
        ))}
      </div>

      {error && <div className="error">{error}</div>}

      <div ref={loadingRef} className="loading-sentinel">
        {loading && <Loader />}
      </div>

      {!hasMore && allItems.length > 0 && (
        <div className="no-more">End of subreddits</div>
      )}
    </div>
  );
};

export default Subreddits;
