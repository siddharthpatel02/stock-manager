import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({
  sales,
  stock,
  stockReturn,
}: {
  sales: [number];
  stock: [number];
  stockReturn: [number];
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        boxHeight: "20rem",
      },
      title: {
        display: true,
        text: "Last 4 weeks",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Disable y-axis grid lines
        },
      },
    },
    elements: {
      line: {
        borderWidth: 0, // Set the line (border) width to 0 to remove the border
      },
      point: {
        radius: 0, // Set the point (data point) radius to 0 to remove points
      },
    },
  };

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ["1st week", "2nd week", "3rd week", "4th week"];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: sales,
        backgroundColor: "#c10000",
      },
      {
        label: "Stock-Inward",
        data: stock,
        backgroundColor: "#003C3B",
      },
      {
        label: "Stock-Return",
        data: stockReturn,
        backgroundColor: "#808080",
      },
    ],
  };

  return <Bar options={options} data={data}></Bar>;
};
export default BarChart;
