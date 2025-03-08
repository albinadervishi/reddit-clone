import { FC } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import "./VoteButtons.scss";

interface VoteButtonsProps {
  voteValue: number;
  voteCount: number;
  onVote: (value: number) => void;
}

const VoteButtons: FC<VoteButtonsProps> = ({
  voteValue,
  voteCount,
  onVote,
}) => {
  return (
    <div className="vote-buttons">
      <button
        className={`vote-button up ${voteValue === 1 ? "active" : ""}`}
        onClick={() => onVote(1)}
      >
        <ArrowUp size={16} />
      </button>
      <span className="vote-count">{voteCount}</span>
      <button
        className={`vote-button down ${voteValue === -1 ? "active" : ""}`}
        onClick={() => onVote(-1)}
      >
        <ArrowDown size={16} />
      </button>
    </div>
  );
};

export default VoteButtons;
