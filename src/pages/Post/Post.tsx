import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import useSinglePost from "../../hooks/useSinglePost";
import useComments from "../../hooks/useComments";
import { Card, Loader, Header } from "../../components";
import "./Post.scss";

const Post: FC = () => {
  const { subredditId, postId } = useParams();
  const {
    post,
    loading: postLoading,
    error: postError,
  } = useSinglePost(subredditId || "", postId || "");
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(subredditId || "", postId || "");

  const [votedPost, setVotedPost] = useState<number>(0);
  const [votedComments, setVotedComments] = useState<Record<string, number>>(
    {}
  );

  const handlePostVote = (voteValue: number) => {
    setVotedPost(votedPost === voteValue ? 0 : voteValue);
  };

  const handleCommentVote = (commentId: string, voteValue: number) => {
    setVotedComments((prev) => ({
      ...prev,
      [commentId]: prev[commentId] === voteValue ? 0 : voteValue,
    }));
  };

  if (postLoading || commentsLoading) {
    return <Loader />;
  }

  if (postError || commentsError || !post) {
    return <p className="error-message">Error: {postError || commentsError}</p>;
  }

  return (
    <div className="post-detail-container">
      <Header title={post.title} author={`/u/${post.user || "reddituser"}`} />

      <div className="post-content-container">
        <div className="post-detail">
          <Card
            id={post.id}
            title={post.title}
            body={post.body}
            author={post.user || "reddituser"}
            createdAt={post.createdAt}
            voteValue={votedPost}
            voteCount={(post.upvotes || 0) - (post.downvotes || 0) + votedPost}
            onVote={handlePostVote}
            isComment={false}
          />

          <div className="comments-section">
            <h4 className="comments-header">Comments</h4>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Card
                    key={comment.id}
                    id={comment.id}
                    title={`Comment ${comment.id.slice(0, 1)}`}
                    body={comment.body || ""}
                    author={comment.name}
                    createdAt={comment.createdAt}
                    voteValue={votedComments[comment.id] || 0}
                    voteCount={
                      (comment.votes || 278) + (votedComments[comment.id] || 0)
                    }
                    onVote={(value: number) =>
                      handleCommentVote(comment.id, value)
                    }
                    isComment={true}
                  />
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
