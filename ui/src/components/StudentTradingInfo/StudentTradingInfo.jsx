import { Typography, Box, Card, List } from "@mui/joy";
import { Chart } from "../Chart/Chart";

export const NoTradesMessage = "No hay transacciones";

export const StudentTradingInfo = ({ info, username }) => {
  return (
    <>
      {info.length > 0 ? (
        <List sx={{overflowY: "scroll", overflowX: "hidden", maxHeight: "80vh"}}>
          {info.map((trade, index) => (
            <Card key={`${username}TradeCard${index}`} sx={{p:4, m:3}} variant="outlined">
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
          ))}
        </List>
      ) : (
        <Typography level="p" component="p" textColor="neutral.500">
          {NoTradesMessage}
        </Typography>
      )}
    </>
  );
};
