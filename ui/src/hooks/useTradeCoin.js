const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export const useTradeCoin = () => {
  async function BuyCoin(username, coin, quantity, price, justification, chartData){
    const response = await fetch(`${URL}/purchase`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        coin: coin,
        quantity: quantity,
        price: price,
        justification: justification,
        chartData: chartData
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { statusCode: 200, error: false };
    } else {
      return { statusCode: response.status, error: false };
    }
  };

  async function SellCoin(username, coin, quantity, price, justification, chartData){
    const response = await fetch(`${URL}/sell`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        coin: coin,
        quantity: quantity,
        price: price,
        justification: justification,
        chartData: chartData
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { statusCode: 200, error: false };
    } else {
      return { statusCode: response.status, error: false };
    }
  };

  return {BuyCoin, SellCoin}
};
