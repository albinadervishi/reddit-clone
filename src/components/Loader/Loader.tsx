import { FC } from "react";
import { LoaderCircle } from "lucide-react";
import "./Loader.scss";

const Loader: FC = () => {
  return (
    <div className="loading-container">
      <LoaderCircle size={32} />
    </div>
  );
};

export default Loader;
