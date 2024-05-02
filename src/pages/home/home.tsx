import StatCard from "../../components/cards/statCard/statCard";
import PieChart from "../../components/charts/pieChart";
import "./home.scss";
import LowStockPanel from "../../components/panel/infoPanel/lowStockPanel";
import HighSellingProduct from "../../components/panel/hignSellingProduct/highSalePanel";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardData } from "../../api/dashboard.api";
import Loader from "../../components/loader/loader";
import BarChart from "../../components/charts/barChart";
import TryAgain from "../../components/apiError/try-again/tryAgain";

const Home = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const response = await getDashboardData(cookies.jwt);
        return response;
      } catch (error: any) {
        if (error.response.status === 401) {
          queryClient.removeQueries();
          navigate("/login");
        }
        throw error;
      }
    },
    retry: 2,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <TryAgain refetch={refetch} />
      ) : (
        <>
          <div>
            <h1 className="primary-heading">
              Welcome
              <br /> {data.userName || "User"}!
            </h1>
          </div>
          <div className="home-stat-cards">
            <StatCard
              title="Total Sales"
              data={data.totalSales}
              backgroundColor="var(--primary-color)"
            />
            <StatCard
              title="Available Stock"
              data={data.availableStocks}
              backgroundColor="var(--secondary-color)"
              color="#FFFFFF"
            />
            <StatCard
              title="Total Revenue"
              data={data.totalRevenue}
              backgroundColor="var(--primary-color)"
            />
            <StatCard
              title="Total Products"
              data={data.totalProducts}
              backgroundColor="var(--secondary-color)"
              color="#FFFFFF"
            />
          </div>
          <div className="home-charts">
            <div className="home-charts-pie">
              <PieChart
                labels={data.productList.map(
                  (item: { productName: string; _id: string }) =>
                    item.productName
                )}
                figures={data.salesPerProduct}
              />
            </div>
            <div className="home-charts-bar">
              <BarChart
                sales={data.weeklySales}
                stock={data.weeklyStock}
                stockReturn={data.weeklyStockReturn}
              />
            </div>
          </div>
          <div className="home-info-section">
            <LowStockPanel products={data.lowStockProduct} />
            <HighSellingProduct products={data.highSaleProduct} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
