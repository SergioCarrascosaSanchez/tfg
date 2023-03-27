import { useEffect, useState } from "react";

const URL = `${import.meta.env.VITE_PRICES_API_URL}`;

export function useGetListOfPrices(coins) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(200);
  const [data, setData] = useState({});

  async function fetchData(coinList) {
    const fetchError = false;
    const responses = await Promise.all(
      coinList.map((coin) =>
        fetch(`${URL}/last/${coin}BUSD`, {
          method: "GET",
        }).catch((error) => {
          setError(true);
          setStatusCode(null);
          console.log("error:", error);
          fetchError = true;
        })
      )
    );
    if (!fetchError) {
      const data = await Promise.all(
        responses.map((response) => {
          if (response.status !== 200) {
            setError(true);
            setStatusCode(response.status);
            return "error";
          } else {
            return response.json();
          }
        })
      );
      return data;
    }
  }

  useEffect(() => {
    async function getData(coinList) {
      const priceData = await fetchData(coinList);;
      return priceData;
    }
    getData(coins).then((priceData) => {
      const result = coins.reduce((acc, key, index) => {
        acc[key] = priceData[index].price;
        return acc;
      }, {});
      setData(result);
    });
    setLoading(false);
  }, []);

  return { loading, error, statusCode, data };
}
