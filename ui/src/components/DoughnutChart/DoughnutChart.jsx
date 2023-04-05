import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetListOfPrices } from "../../hooks/useGetListOfPrices";
import { Box, CircularProgress } from "@mui/joy";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

ChartJS.register(ArcElement, Tooltip, Legend);

export const chartError = "No se puede mostrar el grafico";

export function DoughnutChart({ portfolio, username, balance }) {
  const pricesData = useGetListOfPrices(
    portfolio.map((element) => element.coin)
  );

  const data = {
    labels: portfolio.map((element) => element.coin).concat("$"),
    datasets: [
      {
        data: portfolio.map(
          (element) => element.quantity * pricesData.data[element.coin]
        ).concat(balance),
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
        position: "bottom",
      },
    },
  };
  return (
    <>
      {pricesData.loading ? (
        <Box sx={{ display: "grid", placeContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : pricesData.error ? (
        <ErrorMessage message={chartError} center={true} />
      ) : (
        <Box data-testid={`${username}PortfolioChart`}>
          <Doughnut data={data} options={options} />
        </Box>
      )}
    </>
  );
}
