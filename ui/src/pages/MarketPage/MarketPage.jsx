import { TextField, Button, Box, Typography } from "@mui/joy";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { stringBUSD } from "../../utils/stringBUSD";
import { PanelOfCoinChartCard } from "../../components/PanelOfCoinChartCard/PanelOfCoinChartCard";

export const MarketName = "Mercados";
export const popularCryptocurrencies = [
  {
    coin: "BTC",
  },
  {
    coin: "ETH",
  },
  {
    coin: "BNB",
  },
  {
    coin: "XRP",
  },
  {
    coin: "DOGE",
  },
  {
    coin: "ADA",
  },
  {
    coin: "SOL",
  },
  {
    coin: "MATIC",
  },
  {
    coin: "DOT",
  },
];
export const MarketPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/coins/${stringBUSD(search)}`);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          mx: { xs: "12%", md: "125px", lg: "200px", xl: "300px" },
          my: "5vh",
        }}
      >
        <Typography
          component="h1"
          sx={{
            my: "2vh",
            typography: {
              xs: "display3",
              md: "display2",
              lg: "display2",
              xl: "display2",
            },
          }}
        >
          {MarketName}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "72% 23%", md: "85% 13%", lg: "86% 12%", xl: "85% 12%" },
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ gridColumn: 1 }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar criptomoneda"
          ></TextField>
          <Button
            onClick={handleSubmit}
            sx={{ gridColumn: 2 }}
            size="sm"
          >
            Buscar
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
          }}
        >
          <PanelOfCoinChartCard coins={popularCryptocurrencies} size={"lg"} />
        </Box>
      </Box>
    </>
  );
};
