import { Box, Typography } from "@mui/joy";
import { GroupOfCoinChartCard } from "../GroupOfCoinChartCard/GroupOfCoinChartCard";
import { DoughnutChart } from "../DoughnutChart/DoughnutChart";
import { TradeCard } from "../TradeCard/TradeCard";

export const StudentTitles = {
  Investments: "Cartera de inversión:",
  Portfolio: "Resumen de la cartera:",
  History: "Historial:",
  Balance: "Saldo disponible: ",
};
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
          marginBottom: "20px",
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
        >{`${StudentTitles.Balance}${data.balance}$`}</Typography>
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
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            gridColumn: 3,
            gridRow: 1,
            marginBottom: { xs: "60px", md: "0", lg: "0", xl: "0" },
          }}
        >
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
            {StudentTitles.Portfolio}
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
              balance={data.balance}
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
            {StudentTitles.Investments}
          </Typography>
          <Box
            sx={{
              display: { xs: "grid", md: "block", lg: "block", xl: "block" },
              placeContent: "center",
            }}
          >
            <GroupOfCoinChartCard
              coins={data.portfolio}
              quantity={true}
              size={"md"}
            />
          </Box>
        </Box>
      </Box>

      <Typography
        component="h2"
        sx={{
          textAlign: "left",
          marginBottom: "20px",
          typography: {
            xs: "h5",
            md: "h5",
            lg: "h5",
            xl: "h4",
          },
        }}
      >
        {StudentTitles.History}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "space-around",
        }}
      >
        {data.tradeHistory
          .sort((a, b) => (a.id > b.id ? -1 : 1))
          .map((trade, index) => (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "48%",
                  xl: "46%",
                },
              }}
            >
              <TradeCard
                key={`${data.username}TradeCard${index}`}
                trade={trade}
                username={data.username}
                index={index}
                role={"STUDENT"}
              />
            </Box>
          ))}
      </Box>
    </>
  );
};
