const URL = `${import.meta.env.VITE_USERS_API_URL}`;
import { useState } from "react";

export const useTradeCoin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);

  async function TradeCoin(
    type,
    username,
    coin,
    quantity,
    price,
    justification,
    chartData
  ) {
    setLoading(true)
    setStatusCode(null)
    setError(false)
    const response = await fetch(`${URL}/students/${username}/trade`, {
      method: "POST",
      body: JSON.stringify({
        type: type,
        coin: coin,
        quantity: quantity,
        price: price,
        justification: justification,
        chartData: chartData,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      setLoading(false)
      setStatusCode(200)
      setError(false)
    } else {
      setLoading(false)
      setStatusCode(response.status)
      setError(true)
    }
  }

  return { loading, error, statusCode, TradeCoin};
};
