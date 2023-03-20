import { Typography, Box, Card } from "@mui/joy";
import { Chart } from "../Chart/Chart";
import { TradeTypeChip } from "../TradeTypeChip/TradeTypeChip";
import { CoinLogo } from "../CoinLogo/CoinLogo";

export const TradeCard = ({ username, trade, index }) => {
  return (
    <Card sx={{ p: 4, m: 3 }} variant="outlined">
      <Box sx={{ display: "grid", gridTemplateColumns: "50% 50%", gap: 10 }}>
        <Box
          data-testid={`${username}TradeChart${index}`}
          sx={{ gridColumn: 1, minWidth: "300px" }}
        >
          <Chart refresh={true} data={trade.chartData} />
        </Box>
        <Box sx={{ gridColumn: 2 }}>
          <Box
            sx={{
              display: "grid",
              placeContent: "left",
              gridTemplateColumns: "30% 70%",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
                gap: 0,
                width: "90px",
              }}
            >
              <Box
                sx={{ gridColumn: 1, display: "grid", placeContent: "left" }}
                data-testid={`${username}Trade${index}Coin${trade.coin}`}
              >
                <CoinLogo coin={trade.coin} size="xs"/>
              </Box>
              <Typography
                level="p"
                component="p"
                sx={{ gridColumn: 2, textAlign: "left", lineHeight: "30px" }}
              >
                {trade.coin}
              </Typography>
            </Box>
            <TradeTypeChip type={trade.type} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat( auto-fit, max(175px) )",
              py:1
            }}
          >
            <Typography level="body1" component="p" sx={{ maxWidth: "80%", gridColumn:1 }}>
              {`Cantidad: ${trade.quantity}`}
            </Typography>
            <Typography level="body1" component="p" sx={{ maxWidth: "80%", gridColumn:2 }}>
              {`Precio: ${trade.price}`}
            </Typography>
          </Box>

          <Typography level="body1" component="p" sx={{ maxWidth: "80%" }}>
            {trade.justification}
          </Typography>
          <Typography
            level="p2"
            component="p2"
            sx={{ maxWidth: "80%",py:1 }}
            textColor="neutral.500"
          >
            {trade.date}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
