import { Chart } from "../../components/Chart/Chart";
import { Box, Typography, Card } from "@mui/joy";
import { useGetPrice } from "../../hooks/useGetPrice";
import CircularProgress from "@mui/joy/CircularProgress";
import { CoinLogo } from "../CoinLogo/CoinLogo";

export const CoinChartCardErrorMessage = "Ha ocurrido un error con ";

export const CoinChartCard = ({ name, time }) => {
  const data = useGetPrice(`${time}`, `${name}BUSD`);
  if (data.loading) {
    return (
      <Card
        key={`${name}Card`}
        component="li"
        variant="outlined"
        data-testid={`${name}CoinChartCard`}
        sx={{
          py: "50px",
          display: "grid",
          placeContent: "center",
        }}
      >
        <CircularProgress />
      </Card>
    );
  }
  if (data.error) {
    return (
      <Card
        key={`${name}Card`}
        component="li"
        variant="outlined"
        data-testid={`${name}CoinChartCard`}
      >
        <Typography level="h2" component="h2">
          {`${CoinChartCardErrorMessage}${name}`}
        </Typography>
      </Card>
    );
  }
  return (
    <Card
      key={`${name}Card`}
      component="li"
      variant="outlined"
      data-testid={`${name}CoinChartCard`}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "18% 42% 40%",
          gap: 0,
          marginBottom: 2,
        }}
      >
        <Box sx={{ gridColumn: 1, display: "grid", placeContent: "center" }}>
          <CoinLogo coin={name} />
        </Box>

        <Typography
          level="h2"
          component="h2"
          sx={{ gridColumn: 2, textAlign: "left" }}
        >
          {name}
        </Typography>

        <Typography level="h2" sx={{ gridColumn: 3, textAlign: "right" }}>
          {data.data[data.data.length - 1]}
        </Typography>
      </Box>
      <Box
        element="div"
        data-testid={`${name}Graph`}
        sx={{
          width: "280px",
          height: "auto",
          margin: "auto",
          borderRadius: "12px",
          dispay: "grid",
          placeContent: "center",
        }}
      >
        <Chart data={data.data} refresh={false} />
      </Box>
    </Card>
  );
};
