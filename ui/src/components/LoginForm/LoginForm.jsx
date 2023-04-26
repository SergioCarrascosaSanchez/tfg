import { Typography, TextField, Button, Box } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useLogin } from "../../hooks/useLogin";

export const LoginFormErrors = {
  Unexpected: "Error al iniciar sesion",
  NotFound: "Usuario o contraseña incorrectos",
  EmptyFields: "Debes rellenar todos los campos",
};
export const LoginFormTexts = {
  Title: "Iniciar sesión",
  Button: "Iniciar sesión",
  UsernamePlaceholder: "Usuario",
  PasswordPlaceholder: "Contraseña",
};

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const { loading, error, statusCode, Login } = useLogin();
  const handleSubmit = async () => {
    setEmptyFields(false);
    if (username.length === 0 || password.length === 0) {
      setEmptyFields(true);
    } else {
      Login(username, password);
    }
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

        {emptyFields && (
          <ErrorMessage message={LoginFormErrors.EmptyFields} form={true} />
        )}
        {error && statusCode === 403 ? (
          <ErrorMessage message={LoginFormErrors.NotFound} form={true} />
        ) : (
          error && (
            <ErrorMessage message={LoginFormErrors.Unexpected} form={true} />
          )
        )}

        <TextField
          name="username"
          placeholder={LoginFormTexts.UsernamePlaceholder}
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          role="password"
          placeholder={LoginFormTexts.PasswordPlaceholder}
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          loading={loading}
          variant="solid"
          onClick={handleSubmit}
          data-testid="submitLoginButton"
          type="submit"
        >
          {LoginFormTexts.Button}
        </Button>
      </Box>
    </>
  );
};
