export const CoinLogo = ({ coin }) => {
  return (
    <img
      src={`../src/assets/CoinLogos/${coin}.png`}
      alt={coin}
      style={{ width: "60px", height: "60px" }}
      onError={(currentTarget) => {
        currentTarget.target.onerror = null; //prevents looping
        currentTarget.target.src = `../src/assets/CoinLogos/DefaultCoin.png`;
      }}
    />
  );
};
