import { Input, Button, Typography, Stack } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useSignupUser } from "../../hooks/useSignupUser";

export const TeacherSignupFormPlaceHolders = {
  username: "Nombre de usuario",
  email: "Email",
  password: "Contraseña",
};
export const TeacherSignupFormMessages = {
  emptyFields: "Debes rellenar todos los campos",
  alreadyCreated: "Ya existe un usuario con ese nombre",
  unexpectedError: "Ha ocurrido un error inesperado",
  correctOperation: "Operación completada con éxito",
};

export const TeacherSignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  const { loading, error, statusCode, signupUser } = useSignupUser();

  return (
    <form
      onSubmit={(event) => {
        setEmptyFieldsError(false);
        event.preventDefault();
        if (username === "" || email === "" || password === "") {
          setEmptyFieldsError(true);
        } else {
          signupUser({
            username: username,
            email: email,
            password: password,
            roles: ["TEACHER"],
          });
        }
      }}
    >
      <Stack spacing={2} sx={{ p: 5, width: "300px" }}>
        <h1>Nuevo profesor</h1>
        {emptyFieldsError && (
          <ErrorMessage
            form="true"
            message={TeacherSignupFormMessages.emptyFields}
          />
        )}
        {(!error && statusCode) === 200 ? (
          <Typography level="p2" textColor="green">
            {TeacherSignupFormMessages.correctOperation}
          </Typography>
        ) : error && statusCode === 409 ? (
          <ErrorMessage
            form="true"
            message={TeacherSignupFormMessages.alreadyCreated}
          />
        ) : (
          error && (
            <ErrorMessage
              form="true"
              message={TeacherSignupFormMessages.unexpectedError}
            />
          )
        )}
        <Input
          type="text"
          placeholder={TeacherSignupFormPlaceHolders.username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Input
          type="email"
          placeholder={TeacherSignupFormPlaceHolders.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          type="password"
          placeholder={TeacherSignupFormPlaceHolders.password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        {loading ? (
          <Button loading type="submit"></Button>
        ) : (
          <Button type="submit">Crear profesor</Button>
        )}
      </Stack>
    </form>
  );
};
