import { Navbar } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { StudentDashboard } from "../../components/StudentDashboard/StudentDashboard";
import { TeacherDashboard } from "../../components/TeacherDashboard/TeacherDashboard";

export const UserPageError =
  "Ha ocurrido un error obteniendo la información del usuario";

export const UnexpectedUserPageError = "Ha ocurrido un error inesperado";

export const UserPage = () => {
  const user = useParams().user;
  const userData = useGetUserData(user);
  return (
    <>
      <Navbar />
      <Box sx={{ mx: "20vw", my: "5vh", maxWidth: "1200px" }}>
        {userData.loading ? (
          <>
            <Typography level="display2" component="h1">
              {user}
            </Typography>
            <Box sx={{ display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </Box>
          </>
        ) : userData.error ? (
          <>
            <Typography level="display2" component="h1">
              {user}
            </Typography>
            <ErrorMessage message={UserPageError} center={true} />
          </>
        ) : userData.data.role === "STUDENT" ? (
          <StudentDashboard data = {userData.data} />
        ) : userData.data.role === "TEACHER" ? (
          <TeacherDashboard data = {userData.data} />
        ) : (
          <>
            <Typography level="display2" component="h1">
              {user}
            </Typography>
            <ErrorMessage message={UnexpectedUserPageError} center={true} />
          </>
        )}
      </Box>
    </>
  );
};
