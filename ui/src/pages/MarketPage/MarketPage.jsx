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
]
export const MarketPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/coins/${stringBUSD(search)}`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mx: "20vw", my: "5vh" }}>
        <Typography level="display2" component="h1" sx={{ my: "2vh" }}>
          {MarketName}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "80% 10%",
            gap: 1,
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
            sx={{ gridColumn: 2, minWidth: "90px" }}
          >
            Buscar
          </Button>
        </Box>
        <PanelOfCoinChartCard coins={popularCryptocurrencies}/>
      </Box>
    </>
  );
};
