import { Typography, Box, Card} from "@mui/joy";
import { Chart } from "../Chart/Chart";

export const TradeCard = ({username, trade, index}) => {
  return (
    <Card
      sx={{ p: 4, m: 3 }}
      variant="outlined"
    >
      <Box data-testid={`${username}TradeChart${index}`}>
        <Chart refresh={true} data={trade.chartData} />
      </Box>
      <p>{trade.date}</p>
      <p>{trade.coin}</p>
      <p>{trade.type}</p>
      <p>{`Cantidad: ${trade.quantity}`}</p>
      <p>{`Precio: ${trade.price}`}</p>
      <p>{trade.justification}</p>
    </Card>
  );
};
