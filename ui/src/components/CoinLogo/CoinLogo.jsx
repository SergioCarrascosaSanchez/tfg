import { CoinLogoFinder } from "./CoinLogoFinder";

export const CoinLogo = ({ coin, size }) => {
  return (
    <img
      src={CoinLogoFinder[coin] || CoinLogoFinder["DefaultCoin"]}
      alt={coin}
      style={
        size === "xs"
          ? { width: "35px", height: "35px", borderRadius:"50%" }
          : size === "md"
          ? { width: "45px", height: "45px", borderRadius:"50%" }
          : size === "lg"
          ? { width: "50px", height: "50px", borderRadius:"50%" }
          : size === "xl" && { width: "60px", height: "60px", borderRadius:"50%" }
      }
    />
  );
};
