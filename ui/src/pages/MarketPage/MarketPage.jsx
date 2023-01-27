import { TextField, Button, Box, Typography } from "@mui/joy";
import { Navbar } from "../../components/Navbar/Navbar";
import { CoinChartCard } from "../../components/CoinChartCard/CoinChartCard";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { stringBUSD } from "../../utils/stringBUSD";

export const MarketName = "Mercados";
export const popularCryptocurrencies = [
  "BTC",
  "ETH",
  "BNB",
  "XRP",
  "DOGE",
  "ADA",
  "SOL",
  "MATIC",
  "DOT",
];
export const MarketPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/${stringBUSD(search)}`);
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
        <Box
          component="ul"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              s: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            columnGap: "40px",
            rowGap: "30px",
            p: 0,
            my: 4,
          }}
        >
          {popularCryptocurrencies.map((coin) => (
            <Link
              to={`/coins/${coin}`}
              key={coin}
              style={{ textDecoration: "none" }}
            >
              <CoinChartCard name={coin} time={"30m"} />
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};
