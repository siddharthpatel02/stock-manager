import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import "./salesList.scss";
import { fetchSalesData, SalesResponseType } from "../../../api/sales.api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";
import TryAgain from "../../apiError/try-again/tryAgain";
import Filter from "../../dropDown/filter";
import { useEffect, useState } from "react";

const SalesList = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dateSortValues = ["Newest", "Oldest"];
  const [sortByDate, setSortByDate] = useState(dateSortValues[0]);
  const {
    isLoading,
    data: sales,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["salesData"],
    queryFn: async () => {
      const sort = sortByDate === "Newest" ? "dsc" : "asc";
      try {
        const data = await fetchSalesData(cookies.jwt, sort);
        return data;
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          queryClient.removeQueries();
          navigate("/login");
        }
        console.log(error.response.status);
        throw error;
      }
    },
    retry: 2,
  });
  useEffect(() => {
    console.log(sortByDate);
    refetch();
  }, [sortByDate]);

  return (
    <div className="sales-list">
      <Filter
        width="18rem"
        initialValue={sortByDate}
        options={dateSortValues}
        onSelectOption={(option) => {
          if (option !== sortByDate) {
            setSortByDate(option);
            console.log(option);
          }
        }}
      />
      {/* <Filter
        width="24rem"
        initialValue={sortByProduct.productName}
        options={productList?.map((product) => product.productName) || []}
        onSelectOption={(option) => {
          setSortByProduct(productList?.);
        }}
      ></Filter> */}
      <div
        className="table-grid sales-list-row"
        style={{ backgroundColor: "#f2f2f2", border: "0" }}
      >
        <h1 className="table-grid-item sales-list-column">Product name</h1>
        <h1 className="table-grid-item">Model</h1>
        <h1 className="table-grid-item">Price</h1>
        <h1 style={{ textAlign: "center" }} className="table-grid-item">
          Quantity
        </h1>
        <h1 className="table-grid-item">Billing Date</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <TryAgain refetch={refetch} />
      ) : sales.length === 0 ? (
        <p className="sales-list-fallback">No data found!</p>
      ) : (
        sales.map((item: SalesResponseType, index: number) => (
          <div
            className="table-grid sales-list-row"
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              marginTop: index === 0 ? "0rem" : "1.6rem",
            }}
          >
            <h1 className="table-grid-item sales-list-column">
              {item.productName}
            </h1>
            <h1 className="table-grid-item">{item.modelName}</h1>
            <h1 className="table-grid-item">{item.unitCost}</h1>
            <h1 style={{ textAlign: "center" }} className="table-grid-item">
              {item.qtySold}
            </h1>
            <h1 style={{ color: "#007FFF" }} className="table-grid-item">
              {item.date}
            </h1>
          </div>
        ))
      )}
    </div>
  );
};

export default SalesList;
