import { StudentSummaryCard } from "../StudentSummaryCard/StudentSummaryCard";
import { Typography, Box } from "@mui/joy";

export const TeacherDashboardTitle = "Listado de alumnos";

export const TeacherDashboard = ({ data }) => {
  return (
    <>
      <Typography level="display2" component="h1" sx={{ lineHeight: "100px", my:"30px"}}>
        {data.username}
      </Typography>
      <Typography level="h3" component="h2">
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
          columnGap: "40px",
          rowGap: "30px",
          p: 0,
          marginTop:"20px"
        }}
      >
        {data.studentList.map((student) => (
          <StudentSummaryCard
            key={`${student.username}ResumeCard`}
            username={student.username}
            tradeHistory={student.tradeHistory}
          />
        ))}
        {data.studentList.map((student) => (
          <StudentSummaryCard
            key={`${student.username}ResumeCard`}
            username={student.username}
            tradeHistory={student.tradeHistory}
          />
        ))}
        {data.studentList.map((student) => (
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
