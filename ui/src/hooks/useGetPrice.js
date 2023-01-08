import { useEffect, useState } from "react";

const URL = `${import.meta.env.VITE_PRICES_API_URL}`;

export function useGetPrice(time, ticker) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${URL}/${time}/${ticker}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setStatusCode(res.status);
            setData(data);
            setLoading(false);
          });
        } else {
          setStatusCode(res.status);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { loading, error, statusCode, data };
}
