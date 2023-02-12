import { Navbar } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const StudentPageError = "Ha ocurrido un error obteniendo la información del estudiante"

export const StudentPage = () => {
  const student = useParams().student;
  const userData = useGetUserData();
  return (
    <>
      <Navbar />
      <h1>{student}</h1>
      {userData.loading ? (
        <CircularProgress />
      ) : userData.error ? (
        <ErrorMessage message={StudentPageError} center={true}/>
      ) : (
        <></>
      )}
    </>
  );
};
