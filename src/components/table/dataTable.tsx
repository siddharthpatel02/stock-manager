import "./dataTable.scss";
type Product = {
  srNo: number;
  productName: string;
  model: string;
  price: string;
  picture: string;
  status: string;
};

const DataTable = ({
  heading,
  product,
}: {
  heading: string[];
  product: Product[];
}) => {
  return (
    <table className="table">
      <thead className="table-heading">
        <tr>
          {heading.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {product.map((product, index) => (
          <tr key={index} className="table-items">
            <td>{product.srNo}</td>
            <td>{product.productName}</td>
            <td>{product.model}</td>
            <td>{product.price}</td>
            <td>{product.picture}</td>
            <td>{product.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
