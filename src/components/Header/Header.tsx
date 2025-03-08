import { FC } from "react";
import "./Header.scss";

interface HeaderProps {
  title: string;
  author?: string;
}

const Header: FC<HeaderProps> = ({ title, author }) => {
  return (
    <div className="app-header">
      <div className="header-content">
        <h1>reddit</h1>
        {title && <h2>{title}</h2>}
        {author && (
          <span className="author-info">
            by <span className="authorName">{author}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
