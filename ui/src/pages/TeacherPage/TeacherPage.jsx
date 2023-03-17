import { CircularProgress, Box, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const TeacherPageError =
  "Ha ocurrido un error obteniendo la información del profesor";

export const TeacherPage = () => {
  const teacher = useParams().teacher;
  const userData = useGetUserData(teacher);
  return (
    <>
      <Navbar />
      <Box sx={{ mx: "20vw", my: "5vh", maxWidth: "1000px" }}>
        {userData.loading ? (
          <>
            <Typography level="display2" component="h1">
              {teacher}
            </Typography>
            <Box sx={{ display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </Box>
          </>
        ) : userData.error ? (
          <>
            <Typography level="display2" component="h1">
              {teacher}
            </Typography>
            <ErrorMessage message={TeacherPageError} center={true} />
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
