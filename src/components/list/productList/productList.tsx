import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import TryAgain from "../../apiError/try-again/tryAgain";
import Loader from "../../loader/loader";
import "./productList.scss";
import { Constants } from "../../../utility/constants/stringConstants";

interface productType {
  _id: string;
  productName: string;
  modelName: string;
  price: string;
  description: string;
  availableStock: number;
  productPhoto: string;
  status: boolean;
  createdOn: string;
  createdBy: string;
  __v: number;
}
const ProductList = ({
  isLoading,
  products,
  refetch,
  isError,
}: {
  isLoading: boolean;
  products: any;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  isError: boolean;
}) => {
  return (
    <div className="product-list">
      <div
        className="table-grid product-list-column"
        style={{ backgroundColor: "#f2f2f2", border: "0" }}
      >
        <div className="table-grid-item">sr no.</div>
        <div className="table-grid-item">product name</div>
        <div className="table-grid-item">model</div>
        <div className="table-grid-item">price</div>
        <div className="table-grid-item">picture</div>
        <div className="table-grid-item">status</div>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <TryAgain refetch={refetch} />
      ) : products.length === 0 ? (
        <div className="product-list-fallback">No product have been added!</div>
      ) : (
        products.map((product: productType, index: number) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              marginTop: index === 0 ? "0rem" : "1.6rem",
            }}
            className="table-grid product-list-column"
          >
            <div style={{ color: "#6a8ace" }} className="table-grid-item">
              {index + 1}
            </div>
            <div className="table-grid-item">{product.productName}</div>
            <div className="table-grid-item">{product.modelName}</div>
            <div className="table-grid-item">{product.price}</div>
            <div className="table-grid-item">
              <img
                style={{ opacity: "0.7", borderRadius: "5px" }}
                width={70}
                height={70}
                src={`${Constants.PRODUCT_IMG_URL + product.productPhoto}`}
                alt="Product img"
              />
            </div>
            <div className="table-grid-item">
              <span
                style={
                  product.status === true
                    ? { backgroundColor: "#32b97a" }
                    : { backgroundColor: "#c83232" }
                }
                className="chip"
              >
                {product.status ? "Continue" : "Discontinued"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
