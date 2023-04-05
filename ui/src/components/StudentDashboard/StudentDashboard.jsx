import { Box, Typography } from "@mui/joy";
import { PanelOfCoinChartCard } from "../PanelOfCoinChartCard/PanelOfCoinChartCard";
import { DoughnutChart } from "../DoughnutChart/DoughnutChart";

export const StudentInvestmentsTitle = "Portfolio de inversion:";
export const StudentPortfolioTitle = "Resumen del portfolio:";
export const StudentDashboard = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          display: { md: "grid", lg: "grid", xl: "grid" },
          gridTemplateColumns: {
            md: "60% 0% 40%",
            lg: "60% 10% 30%",
            xl: "60% 10% 30%",
          },
          placeContent: "center",
          marginBottom:"20px"
        }}
      >
        <Typography
          component="h1"
          sx={{
            gridColumn: 1,
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
            typography: {
              xs: "display4",
              md: "display4",
              lg: "display4",
              xl: "h2",
            },
            gridColumn: 3,
            textAlign: "center",
            alignSelf: "center",
          }}
        >{`Balance: ${data.balance}$`}</Typography>
      </Box>
      <Box
        sx={{
          display: { md: "grid", lg: "grid", xl: "grid" },
          placeContent: "center",
          gridTemplateColumns: {
            md: "60% 0% 40%",
            lg: "60% 10% 30%",
            xl: "60% 10% 30%",
          },
          marginBottom:"20px"
        }}
      >
        <Box sx={{ gridColumn: 3, gridRow: 1, marginBottom: { xs: "60px", md: "0", lg: "0", xl: "0" }}}>
          <Typography
            component="h2"
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              typography: {
                xs: "h5",
                md: "h5",
                lg: "h5",
                xl: "h4",
              },
            }}
          >
            {StudentPortfolioTitle}
          </Typography>
          <Box
            sx={{
              maxWidth: { xs: "300px", md: "500px", lg: "500px", xl: "500px" },
              mx: { xs: "auto", md: "0", lg: "0", xl: "0" },
            }}
          >
            <DoughnutChart
              username={data.username}
              portfolio={data.portfolio}
            />
          </Box>
        </Box>
        <Box sx={{ gridColumn: 1, gridRow: 1 }}>
          <Typography
            component="h2"
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
                lg: "left",
                xl: "left",
              },
              typography: {
                xs: "h5",
                md: "h5",
                lg: "h5",
                xl: "h4",
              },
            }}
          >
            {StudentInvestmentsTitle}
          </Typography>
          <Box
            sx={{
              display: { xs: "grid", md: "block", lg: "block", xl: "block" },
              placeContent: "center",
            }}
          >
            <PanelOfCoinChartCard coins={data.portfolio} size={"md"} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
