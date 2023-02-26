import * as React from "react";
import Box from "@mui/joy/Box";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IncorrectUserPass, setIncorrectUserPass] = useState("none");
  const [loginError, setLoginError] = useState("none");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoginError("none");
    setIncorrectUserPass("none");
    setLoading(true);
    await fetch(`${import.meta.env.VITE_USERS_API_URL}/login`, {
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
          navigate(`/students/${username}`);
          localStorage.setItem("username", username);
        } else if (res.status === 401) {
          setIncorrectUserPass("block");
        } else {
          setLoginError("block");
        }
      })
      .catch((err) => {
        setLoginError("block");
      });
    setLoading(false);
  };

  let LoadingButton;

  if (!loading) {
    LoadingButton = (
      <Button variant="solid" onClick={handleSubmit} data-testid="submitLoginButton">
        Iniciar sesión
      </Button>
    );
  } else {
    LoadingButton = (
      <Button variant="solid" onClick={handleSubmit} loading></Button>
    );
  }

  return (
    <>
      <Box
        sx={{
          py: 5,
          px: 5,
          display: "grid",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography level="h2">Iniciar sesión</Typography>
        <Typography level="p2" textColor="red" display={loginError}>
          Error al iniciar sesion
        </Typography>
        <Typography level="p2" textColor="red" display={IncorrectUserPass}>
          Usuario o contraseña incorrectos
        </Typography>
        <TextField
          name="username"
          label="Usuario"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          role="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        {LoadingButton}
      </Box>
    </>
  );
};
