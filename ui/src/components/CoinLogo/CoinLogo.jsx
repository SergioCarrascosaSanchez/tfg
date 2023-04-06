import { Box } from "@mui/joy";
import { CoinLogoFinder } from "./CoinLogoFinder";

export const CoinLogo = ({ coin, size }) => {
  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        width:
          size === "xl"
            ? {
                xs: "40px",
                md: "50px",
                lg: "55px",
                xl: "55px",
              }
            : size === "xs"
            ? "35px"
            : size === "md"
            ? "45px"
            : size === "lg" && "50px",
      }}
    >
      <img
        src={CoinLogoFinder[coin] || CoinLogoFinder["DefaultCoin"]}
        alt={coin}
        width="100%"
        style={{ borderRadius: "50%" }}
      />
    </Box>
  );
};
