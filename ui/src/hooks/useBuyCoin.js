const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export const useBuyCoin = () => {
  return async (username, coin, quantity, price) => {
    const response = await fetch(`${URL}/purchase`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        coin: coin,
        quantity: quantity,
        price: price,
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
};
