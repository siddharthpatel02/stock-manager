import useProducts from "../../../customeHooks/useProductHook";
import "../stockList/stockList.scss";
import ListItem from "./listItem/listItem";
import { productResponseType } from "../../../api/productApi";
import Loader from "../../loader/loader";
const StockList = () => {
  const [isLoading, products, refetch, isError] = useProducts();
  return (
    <div className="stock-list">
      <div
        className="table-grid stock-list-column"
        style={{ backgroundColor: "#f2f2f2", border: "0" }}
      >
        <div className="table-grid-item">sr no.</div>
        <div className="table-grid-item">product name</div>
        <div className="table-grid-item">model</div>
        <div className="table-grid-item">unit price</div>
        <div className="table-grid-item">picture</div>
        <div className="table-grid-item">quantity</div>
        <div className="table-grid-item">status</div>
        <div className="table-grid-item">action</div>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="product-list-fallback">
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
      ) : products.length === 0 ? (
        <div className="product-list-fallback">
          Add products in product list!
        </div>
      ) : (
        products.map((item: productResponseType, index: number) => (
          <ListItem
            key={item._id}
            stock={item}
            index={index}
            refetch={refetch}
          ></ListItem>
        ))
      )}
    </div>
  );
};

export default StockList;
