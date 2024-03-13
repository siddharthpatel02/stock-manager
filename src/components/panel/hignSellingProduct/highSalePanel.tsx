import "./highSalePanel.scss";

const HighSellingProduct = ({ products }: { products: any }) => {
  return (
    <div className="high-sale">
      <h1 className="high-sale-heading">High selling products</h1>
      <div className="high-sale-row" style={{ color: "var(--primary-color)" }}>
        <div>product name</div>
        <div>model</div>
        <div>Qty</div>
      </div>
      {products.map((item: any) => (
        <div className="high-sale-row" key={item._id}>
          <div>{item.productName}</div>
          <div>{item.modelName}</div>
          <div>{item.totalSales}</div>
        </div>
      ))}
    </div>
  );
};

export default HighSellingProduct;
