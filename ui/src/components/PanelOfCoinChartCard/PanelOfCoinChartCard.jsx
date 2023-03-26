import { Box } from "@mui/joy";
import { CoinChartCard } from "../CoinChartCard/CoinChartCard";
import { Link } from "react-router-dom";

export const PanelOfCoinChartCard = ({ coins }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          s: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(2, 1fr)",
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
          <CoinChartCard name={coinObject.coin} time={"30m"} />
        </Link>
      ))}
    </Box>
  );
};