import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = ({
  labels,
  figures,
}: {
  labels: [string];
  figures: [number];
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: figures,
        // backgroundColor: ["#c10000", "#003C3B"],
        // borderColor: ["#c10000", "#003C3B"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;
