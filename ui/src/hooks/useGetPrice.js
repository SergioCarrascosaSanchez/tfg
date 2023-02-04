import { useEffect, useState } from "react";

const URL = `${import.meta.env.VITE_PRICES_API_URL}`;

export function useGetPrice(time, coin, refresh) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${URL}/${time}/${coin}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((resData) => {
            setStatusCode(res.status);
            setData(resData.prices);
            setLoading(false);
          });
        } else {
          setStatusCode(res.status);
          setLoading(false);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (refresh) {
      const intervalCall = setInterval(() => {
        fetch(`${URL}/last/${coin}`, {
          method: "GET",
        })
          .then((res) => {
            if (res.status === 200) {
              res.json().then((resData) => {
                if (data.length > 130) {
                  let newData = data
                    .slice(1, data.length - 1)
                    .concat(resData.price);
                  setData(newData);
                } else {
                  setData([...data, resData.price]);
                }
              });
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log("error", err);
          });
      }, 10000);
      return () => {
        clearInterval(intervalCall);
      };
    }
  });

  return { loading, error, statusCode, data };
}
