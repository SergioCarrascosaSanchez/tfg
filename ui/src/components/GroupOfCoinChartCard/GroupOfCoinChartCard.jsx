import { Box } from "@mui/joy";
import { CoinChartCard } from "../CoinChartCard/CoinChartCard";
import { Link } from "react-router-dom";

export const GroupOfCoinChartCard = ({ coins, size, quantity }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          md: size === "lg" ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
          lg: size === "lg" ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
          xl: size === "lg" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
        },
        columnGap: "40px",
        rowGap: "30px",
        p: 0,
        my: 4,
      }}
    >
      {coins.map((coinObject) => (
        <Link
          to={`/coins/${coinObject.coin}`}
          key={coinObject.coin}
          style={{ textDecoration: "none" }}
        >
          {quantity ? (
            <CoinChartCard name={coinObject.coin} time={"30m"} quantity={coinObject.quantity}/>
          ) : (
            <CoinChartCard name={coinObject.coin} time={"30m"} />
          )}
        </Link>
      ))}
    </Box>
  );
};
