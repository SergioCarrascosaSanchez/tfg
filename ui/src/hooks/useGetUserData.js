import { useEffect, useState } from "react";

const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export function useGetUserData(username) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${URL}/users/${username}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((resData) => {
            const roundedBalance = resData.balance.toFixed(2);
            resData.balance = roundedBalance
            setStatusCode(res.status);
            setData(resData);
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
        console.log(err)
      });
  }, []);

  return { loading, error, statusCode, data };
}