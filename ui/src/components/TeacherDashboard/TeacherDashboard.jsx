import { StudentSummaryCard } from "../StudentSummaryCard/StudentSummaryCard";
import { Typography, Box } from "@mui/joy";

export const TeacherDashboardTitle = "Listado de alumnos";

export const TeacherDashboard = ({ data }) => {
  return (
    <>
      <Typography
        component="h1"
        sx={{
          my: {
            xs: "10px",
            md: "10px",
            lg: "10px",
            xl: "20px",
          },
          textAlign: {
            xs: "center",
            md: "left",
            lg: "left",
            xl: "left",
          },
          alignSelf: "center",
          typography: {
            xs: "display3",
            md: "display3",
            lg: "display3",
            xl: "display2",
          },
        }}
      >
        {data.username}
      </Typography>
      <Typography
        component="h2"
        sx={{
          textAlign: {
            xs: "center",
            md: "left",
            lg: "left",
            xl: "left",
          },
          alignSelf: "center",
          typography: {
            xs: "h4",
            md: "h4",
            lg: "h4",
            xl: "h3",
          },
        }}
      >
        {TeacherDashboardTitle}
      </Typography>
      <Box
        component="ul"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            s: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          },
          columnGap: "60px",
          rowGap: "60px",
          p: 0,
          marginTop: "20px",
        }}
      >
        {data.studentList
          .sort((a, b) => (a.username > b.username ? 1 : -1))
          .map((student) => (
            <StudentSummaryCard
              key={`${student.username}ResumeCard`}
              username={student.username}
              tradeHistory={student.tradeHistory}
            />
          ))}
      </Box>
    </>
  );
};
