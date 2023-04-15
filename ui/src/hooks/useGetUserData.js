import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext" 
const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export function useGetUserData(username) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [data, setData] = useState([]);

  const context = useContext(UserContext)

  const GetUserData = () => {
    context.loading = true
    setLoading(true);
    fetch(`${URL}/users/${username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((resData) => {
            if (resData.role === "STUDENT") {
              const roundedBalance = resData.balance.toFixed(2);
              resData.balance = roundedBalance;
            }
            setStatusCode(res.status);
            setData(resData);
            setLoading(false);
            context.loading = false
          });
        } else {
          setStatusCode(res.status);
          setLoading(false);
          setError(true);
          context.loading = false
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        context.loading = false
        console.log(err);
      });
  };

  context.loading = true
  context.GetUserData = GetUserData

  useEffect(() => {
    GetUserData()
  }, [])

  return { loading, error, statusCode, data, GetUserData };
}
