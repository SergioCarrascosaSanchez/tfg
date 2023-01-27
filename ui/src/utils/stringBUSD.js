export const stringBUSD = (coin) => {
  const termination = "BUSD";
  if (!coin.endsWith(termination)) return coin;
  return coin.substring(0, coin.length - termination.length);
};
