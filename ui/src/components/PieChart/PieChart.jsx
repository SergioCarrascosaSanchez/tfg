import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ portfolio }) {
  console.log(portfolio)
  const data = {
    labels: portfolio.map((element) => element.coin),
    datasets: [
      {
        data: portfolio.map((element) => element.quantity),
        backgroundColor: [
          "#F06F64",
          "#60F0A0",
          "#7EAFE6",
          "#926CF0",
          "#F084ED",
          "#6CEAF0",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  return <Doughnut data={data} options={options}/>;
}
