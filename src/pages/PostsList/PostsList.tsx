import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useSingleSubreddit from "../../hooks/useSingleSubreddit";
import usePosts from "../../hooks/usePosts";
import { Card, Loader, Header } from "../../components";
import { formatFullDate } from "../../utils/dateUtils";
import "./PostsList.scss";

const PostsList: FC = () => {
  const navigate = useNavigate();
  const { subredditId } = useParams();
  const {
    subreddit,
    loading: subredditLoading,
    error: subredditError,
  } = useSingleSubreddit(subredditId || "");
  const { posts, loading, error } = usePosts(subredditId || "");

  const [sortOption, setSortOption] = useState<string>("Title asc");
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [votedPosts, setVotedPosts] = useState<Record<string, number>>({});

  const handleSort = (option: string) => {
    setSortOption(option);
    setShowSortOptions(false);
  };

  const handleVote = (postId: string, voteValue: number) => {
    setVotedPosts((prev) => ({
      ...prev,
      [postId]: prev[postId] === voteValue ? 0 : voteValue,
    }));
  };

  if (subredditLoading || loading) {
    return <Loader />;
  }

  if (subredditError || error) {
    return <p className="error-message">Error: {subredditError || error}</p>;
  }

  //sort posts
  let sortedPosts = [...posts];
  switch (sortOption) {
    case "Title asc":
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Title desc":
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Date asc":
      sortedPosts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    case "Date desc":
      sortedPosts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      break;
  }

  return (
    <div className="posts-container">
      <Header title={`/r/${subreddit?.title}`} />

      <div className="posts-content">
        <div className="content-layout">
          <div className="posts-column">
            <div className="sort-container">
              <div className="sort-by">
                <span>Sort by</span>
                <div className="dropdown-container">
                  <button
                    className="sort-dropdown-button"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                  >
                    {sortOption} <ChevronDown size={16} />
                  </button>

                  {showSortOptions && (
                    <div className="sort-options">
                      <div onClick={() => handleSort("Title asc")}>
                        Title asc
                      </div>
                      <div onClick={() => handleSort("Title desc")}>
                        Title desc
                      </div>
                      <div onClick={() => handleSort("Date asc")}>Date asc</div>
                      <div onClick={() => handleSort("Date desc")}>
                        Date desc
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="posts-list">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  author={post.user || "reddituser"}
                  createdAt={post.createdAt}
                  voteValue={votedPosts[post.id] || 0}
                  voteCount={
                    (post.upvotes || 0) -
                    (post.downvotes || 0) +
                    (votedPosts[post.id] || 0)
                  }
                  onVote={(value: number) => handleVote(post.id, value)}
                  onClick={() =>
                    navigate(`/subreddits/${subredditId}/posts/${post.id}`)
                  }
                  isComment={false}
                />
              ))}
            </div>
          </div>

          <div className="subreddit-sidebar">
            <div className="sidebar-card">
              <h3>/r/{subreddit?.title}</h3>
              <div className="sidebar-content">
                <p className="sidebar-description">
                  This is the official subreddit for {subreddit?.title}
                </p>
                <p className="sidebar-info">
                  Welcome to the {subreddit?.title} community! Here you can
                  discuss all things related to {subreddit?.title}.
                </p>
                <div className="sidebar-meta">
                  <div className="sidebar-admin">
                    <span className="label">admin </span>
                    <span className="value">/u/{subreddit?.admin}</span>
                  </div>
                  <div className="sidebar-created">
                    created on {formatFullDate(subreddit?.createdAt || "")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
