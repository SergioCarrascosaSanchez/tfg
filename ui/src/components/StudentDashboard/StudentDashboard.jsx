import { Box, Typography } from "@mui/joy";
import { PanelOfCoinChartCard } from "../PanelOfCoinChartCard/PanelOfCoinChartCard";

export const StudentInvestmentsTitle = "Portfolio de inversion:";

export const StudentDashboard = ({data}) => {
  return (
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
          {data.username}
        </Typography>
        <Typography
          level="h2"
          component="h2"
          sx={{ gridColumn: 2, textAlign: "right", lineHeight: "100px" }}
        >{`Balance: ${data.balance}$`}</Typography>
      </Box>
      <Typography level="h3" component="h2">
        {StudentInvestmentsTitle}
      </Typography>
      <PanelOfCoinChartCard coins={data.portfolio} />
    </>
  );
};
