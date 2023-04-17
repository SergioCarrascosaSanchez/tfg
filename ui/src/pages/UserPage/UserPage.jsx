import { Navbar } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { StudentDashboard } from "../../components/StudentDashboard/StudentDashboard";
import { TeacherDashboard } from "../../components/TeacherDashboard/TeacherDashboard";
import { AdminDashboard } from "../../components/AdminDashboard/AdminDashboard";

export const UserPageError =
  "Ha ocurrido un error obteniendo la información del usuario";

export const UnexpectedUserPageError = "Ha ocurrido un error inesperado";

export const AuthorizationError = "No tienes acceso a esta información";

export const UserPage = () => {
  const user = useParams().user;
  const {loading, error, statusCode, data, GetUserData} = useGetUserData(user);

  return (
    <>
      <Navbar />
        <Box
          sx={{
            mx: { xs: "12%", md: "125px", lg: "200px", xl: "auto" },
            px: { xs: "0", md: "0", lg: "0", xl: "15%" },
            my: "5vh",
            maxWidth: "1800px",
          }}
        >
          {loading ? (
            <>
              <Typography level="display2" component="h1">
                {user}
              </Typography>
              <Box sx={{ display: "grid", placeContent: "center" }}>
                <CircularProgress />
              </Box>
            </>
          ) : statusCode === 403 ? (
            <>
              <Typography level="display2" component="h1">
                {user}
              </Typography>
              <ErrorMessage message={AuthorizationError} center={true} />
            </>
          ) : error ? (
            <>
              <Typography level="display2" component="h1">
                {user}
              </Typography>
              <ErrorMessage message={UserPageError} center={true} />
            </>
          ) : data.role === "STUDENT" ? (
            <StudentDashboard data={data} />
          ) : data.role === "TEACHER" ? (
            <TeacherDashboard data={data} />
          ) : data.role === "ADMIN" ? (
            <AdminDashboard />
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
