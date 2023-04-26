import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();

  const Login = (username, password) => {
    setLoading(true);
    setStatusCode(null)
    setError(false)

    fetch(`${import.meta.env.VITE_USERS_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((resData) => {
            localStorage.setItem("username", username);
            localStorage.setItem("token", resData.token);
            setLoading(false);
            navigate(`/users/${username}`);
          });
        } else {
          setStatusCode(res.status);
          setError(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  return { loading, error, statusCode, Login };
};
