import { Navbar } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";

export const StudentPageError = "Ha ocurrido un error obtenido la información del estudiante"

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
        <h2>{StudentPageError}</h2>
      ) : (
        <></>
      )}
    </>
  );
};
