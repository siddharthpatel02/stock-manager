import "./gridTable.scss";

const GridTable = ({ isHeader }: { isHeader: boolean }) => {
  return (
    <div
      style={!isHeader ? { backgroundColor: "white", borderRadius: "8px",marginTop:"2rem" } : {}}
      className="grid-container"
    >
      <div className="grid-container-item">sr no.</div>
      <div className="grid-container-item">product name</div>
      <div className="grid-container-item">model</div>
      <div className="grid-container-item">price</div>
      <div className="grid-container-item">picture</div>
      <div className="grid-container-item">status</div>
    </div>
  );
};

export default GridTable;
