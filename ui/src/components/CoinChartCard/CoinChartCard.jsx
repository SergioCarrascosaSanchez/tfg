import { Chart } from "../../components/Chart/Chart";
import Avatar from "@mui/joy/Avatar";
import { Box, Typography, Card } from "@mui/joy";
import { useGetPrice } from "../../hooks/useGetPrice";
import CircularProgress from "@mui/joy/CircularProgress";

export const CoinChartCardErrorMessage = "Ha ocurrido un error con ";

export const CoinChartCard = ({ name, time }) => {
  const data = useGetPrice(`${time}`, `${name}BUSD`);
  if (data.loading) {
    return (
      <Card
        key={`${name}Card`}
        component="li"
        variant="outlined"
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
      <Card key={`${name}Card`} component="li" variant="outlined">
        <Typography level="h2" component="h2">
          {`${CoinChartCardErrorMessage}${name}`}
        </Typography>
      </Card>
    );
  }
  return (
    <Card key={`${name}Card`} component="li" variant="outlined">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "18% 42% 40%",
          gap: 0,
          marginBottom: 2,
        }}
      >
        <Avatar
          alt={String(name)}
          src={`/static/CoinLogos/${name}.png `}
          size="sm"
          sx={{ gridColumn: 1, margin: "auto" }}
        />

        <Typography
          level="h2"
          component="h2"
          sx={{ gridColumn: 2, textAlign: "left" }}
        >
          {name}
        </Typography>

        <Typography level="h2" sx={{ gridColumn: 3, textAlign: "right" }}>
          {data.data.prices[data.data.prices.length - 1]}
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
        <Chart data={data.data.prices} />
      </Box>
    </Card>
  );
};
