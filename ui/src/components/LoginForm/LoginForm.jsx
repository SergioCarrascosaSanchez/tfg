import { Typography, TextField, Button, Box } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const LoginFormErrors = {
  Unexpected: "Error al iniciar sesion",
  NotFound: "Usuario o contraseña incorrectos"
}
export const LoginFormTexts = {
  Title: "Iniciar sesión",
  Button: "Iniciar sesión"
}

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
        <Typography level="h2">{LoginFormTexts.Title}</Typography>

        {loginError && (
          <ErrorMessage message={LoginFormErrors.Unexpected} form={true} />
        )}
        {IncorrectUserPass && (
          <ErrorMessage
            message={LoginFormErrors.NotFound}
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
          {LoginFormTexts.Button}
        </Button>
      </Box>
    </>
  );
};
