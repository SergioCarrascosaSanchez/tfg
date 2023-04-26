import { Typography, TextField, Button, Box } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IncorrectUserPass, setIncorrectUserPass] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoginError(false);
    setIncorrectUserPass(false);
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
          res.json().then((resData) => {
            localStorage.setItem("username", username);
            localStorage.setItem("token", resData.token);
            navigate(`/users/${username}`);
          });
        } else if (res.status === 403) {
          setIncorrectUserPass(true);
        } else {
          setLoginError(true);
        }
      })
      .catch((err) => {
        setLoginError(true);
      });
    setLoading(false);
  };

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

        {loginError && (
          <ErrorMessage message={"Error al iniciar sesion"} form={true} />
        )}
        {IncorrectUserPass && (
          <ErrorMessage
            message={"Usuario o contraseña incorrectos"}
            form={true}
          />
        )}

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
        <Button
          loading={loading}
          variant="solid"
          onClick={handleSubmit}
          data-testid="submitLoginButton"
        >
          Iniciar sesión
        </Button>
      </Box>
    </>
  );
};
