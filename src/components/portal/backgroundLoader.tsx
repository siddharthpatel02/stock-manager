import Loader from "../loader/loader";
import "./backgroundLoader.scss";
const BackgroundLoader = () => {
  return (
    
    <div className="loader-modal">
      <Loader></Loader>
    </div>
  );
};

export default BackgroundLoader;
