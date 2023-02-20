import { Navbar } from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { PanelOfCoinChartCard } from "../../components/PanelOfCoinChartCard/PanelOfCoinChartCard";

export const StudentPageError =
  "Ha ocurrido un error obteniendo la información del estudiante";

export const StudentInvestmentsTitle = "Portfolio de inversion:";

export const StudentPage = () => {
  const student = useParams().student;
  const userData = useGetUserData(student);
  return (
    <>
      <Navbar />
      <Box sx={{ mx: "20vw", my: "5vh", maxWidth: "1000px" }}>
        {userData.loading ? (
          <>
            <Typography level="display2" component="h1">
              {student}
            </Typography>
            <Box sx={{ display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </Box>
          </>
        ) : userData.error ? (
          <>
            <Typography level="display2" component="h1">
              {student}
            </Typography>
            <ErrorMessage message={StudentPageError} center={true} />
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "70% 30%",
                gap: 0,
                placeContent: "center",
              }}
            >
              <Typography
                level="display2"
                component="h1"
                sx={{ gridColumn: 1, textAlign: "left", lineHeight: "100px" }}
              >
                {student}
              </Typography>
              <Typography
                level="h2"
                component="h2"
                sx={{ gridColumn: 2, textAlign: "right", lineHeight: "100px" }}
              >{`Balance: ${userData.data.balance}$`}</Typography>
            </Box>
            <Typography level="h3" component="h2">
              {StudentInvestmentsTitle}
            </Typography>
            <PanelOfCoinChartCard coins={userData.data.portfolio} />
          </>
        )}
      </Box>
    </>
  );
};
