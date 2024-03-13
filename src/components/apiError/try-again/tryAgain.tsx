import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import "./tryAgain.scss";

const TryAgain = ({
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  return (
    <div className="try-again">
      <p>Something went wrong !</p>
      <button
        onClick={() => {
          refetch();
        }}
        className="btn-primary-fill "
        style={{
          padding: "6px",
          marginTop: "10px",
          backgroundColor: "#003C3B",
          border: "0",
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default TryAgain;
