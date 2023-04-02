import { Input, Button, Typography, Stack } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useSignupUser } from "../../hooks/useSignupUser";

export const StudentSignupFormPlaceHolders = {
  username: "Nombre de usuario",
  email: "Email",
  balance: "Balance inicial",
  password: "Contraseña",

};
export const StudentSignupFormMessages = {
  emptyFields: "Debes rellenar todos los campos",
  alreadyCreated: "Ya existe un usuario con ese nombre",
  unexpectedError: "Ha ocurrido un error inesperado",
  correctOperation: "Operación completada con éxito",
};

export const StudentSignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [password, setPassword] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  const { loading, error, statusCode, signupUser } = useSignupUser();

  return (
    <form
      onSubmit={(event) => {
        setEmptyFieldsError(false);
        event.preventDefault();
        if (username === "" || email === "" || balance === 0 || password === "") {
          setEmptyFieldsError(true);
        } else {
          signupUser({
            username: username,
            email: email,
            initialBalance: balance,
            password: password,
            roles: ["STUDENT"],
          });
        }
      }}
    >
      <Stack spacing={2} sx={{ p: 5, width: "300px" }}>
        <h1>Nuevo estudiante</h1>
        {emptyFieldsError && (
          <ErrorMessage
            form="true"
            message={StudentSignupFormMessages.emptyFields}
          />
        )}
        {(!error && statusCode) === 200 ? (
          <Typography level="p2" textColor="green">
            {StudentSignupFormMessages.correctOperation}
          </Typography>
        ) : error && statusCode === 409 ? (
          <ErrorMessage
            form="true"
            message={StudentSignupFormMessages.alreadyCreated}
          />
        ) : (
          error && (
            <ErrorMessage
              form="true"
              message={StudentSignupFormMessages.unexpectedError}
            />
          )
        )}
        <Input
          type="text"
          placeholder={StudentSignupFormPlaceHolders.username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Input
          type="email"
          placeholder={StudentSignupFormPlaceHolders.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          type="number"
          placeholder={StudentSignupFormPlaceHolders.balance}
          onChange={(e) => {
            setBalance(e.target.value);
          }}
        ></Input>
        <Input
          type="password"
          placeholder={StudentSignupFormPlaceHolders.password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        {loading ? (
          <Button loading type="submit"></Button>
        ) : (
          <Button type="submit">Crear estudiante</Button>
        )}
      </Stack>
    </form>
  );
};
