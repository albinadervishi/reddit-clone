import { FC } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatTimeAgo, formatFullDate } from "../../utils/dateUtils";
import "./Card.scss";

interface CardProps {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  voteValue: number;
  voteCount: number;
  onVote: (value: number) => void;
  onClick?: () => void;
  isComment?: boolean;
  className?: string;
}

const Card: FC<CardProps> = ({
  id,
  title,
  body,
  author,
  createdAt,
  voteValue,
  voteCount,
  onVote,
  onClick,
  isComment = false,
  className = "",
}) => {
  return (
    <div
      className={`card ${
        isComment ? "comment-card" : "post-card"
      } ${className}`}
    >
      <div className="vote-buttons">
        <button
          className={`vote-button up ${voteValue === 1 ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onVote(1);
          }}
        >
          <ArrowUp size={16} />
        </button>
        <span className="vote-count">{voteCount}</span>
        <button
          className={`vote-button down ${voteValue === -1 ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onVote(-1);
          }}
        >
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="card-content" onClick={onClick}>
        <h3 className="card-title">{title}</h3>
        <p className="card-body">{body}</p>
        <div className="card-meta">
          <span className="card-author">/u/{author}</span>
          <span className="card-date" title={formatFullDate(createdAt)}>
            {formatTimeAgo(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
