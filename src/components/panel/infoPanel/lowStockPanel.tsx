import "./lowStockPanel.scss";

const LowStockPanel = ({ products }: { products: any }) => {
  return (
    <div className="low-stock">
      <h1 className="low-stock-heading">Low stock products</h1>
      <div className="low-stock-row" style={{ color: "var(--primary-color)" }}>
        <div>product name</div>
        <div>model</div>
        <div>stock</div>
        <div>status</div>
      </div>
      {products.map((item: any) => (
        <div className="low-stock-row" key={item._id}>
          <div>{item.productName}</div>
          <div>{item.modelName}</div>
          <div>{item.availableStock}</div>
          <div>{item.availableStock <= 0 ? "Out of Stock" : "In Stock"}</div>
        </div>
      ))}
    </div>
  );
};

export default LowStockPanel;
