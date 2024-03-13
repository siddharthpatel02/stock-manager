import { useState } from "react";
import StockForm from "../../../forms/stockForm/stockForm";
import "./listItem.scss";
import { productResponseType } from "../../../../api/productApi";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { Constants } from "../../../../utility/constants/stringConstants";

const ListItem = ({
  stock,
  index,
  refetch,
}: {
  stock: productResponseType;
  index: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  const [editStock, setEditStock] = useState(false);
  return (
    <>
      <div className="table-grid stock-list-column">
        <div className="table-grid-item">{index + 1}</div>
        <div className="table-grid-item">{stock.productName}</div>
        <div className="table-grid-item">{stock.modelName}</div>
        <div className="table-grid-item">{stock.price}</div>
        <div className="table-grid-item">
          <img
            style={{ opacity: "0.7", borderRadius: "5px" }}
            width={70}
            height={70}
            src={`${Constants.PRODUCT_IMG_URL + stock.productPhoto}`}
            alt="Product img"
          />
        </div>
        <div className="table-grid-item">{stock.availableStock}</div>
        <div className="table-grid-item">
          <span
            style={
              stock.availableStock < 1
                ? { backgroundColor: "#c83232" }
                : { backgroundColor: "#32b97a" }
            }
            className="chip"
          >
            {stock.availableStock < 1 ? "Out of stock" : "Available"}
          </span>
        </div>
        <div className="table-grid-item">
          <button
            onClick={() => setEditStock(!editStock)}
            style={{ padding: "0.6rem", fontSize: "1.4rem" }}
            className="btn-primary-fill"
          >
            Maintain
          </button>
        </div>
      </div>
      {editStock && (
        <StockForm
          closeForm={() => setEditStock(false)}
          productId={stock._id}
          productName={stock.productName}
          unitPrice={stock.price}
          model={stock.modelName}
          totalStock={stock.availableStock}
          refetch={refetch}
        ></StockForm>
      )}
    </>
  );
};

export default ListItem;
