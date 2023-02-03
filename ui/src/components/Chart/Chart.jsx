import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
const options = {
  responsive: true,
  borderWidth: 3,
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderJoinStyle: "round",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
export const Chart = (props) => {
  const data = props.data;
  const filledData = data;
  const labels = filledData;
  let color;
  if (data[0] > data[data.length - 1]) {
    color = "#FF0101";
  } else {
    color = "#4caf50";
  }
  while (filledData.length < 48) {
    filledData.push(undefined);
  }
  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: filledData,
        borderColor: color,
      },
    ],
  };
  return <Line options={options} data={chartData}></Line>;
};
