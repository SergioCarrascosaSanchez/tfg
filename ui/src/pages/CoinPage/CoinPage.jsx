import { Navbar } from "../../components/Navbar/Navbar";
import { Chart } from "../../components/Chart/Chart";
import { Box, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useGetPrice } from "../../hooks/useGetPrice";
import CircularProgress from "@mui/joy/CircularProgress";
import { CoinLogo } from "../../components/CoinLogo/CoinLogo";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { TradeMenu } from "../../components/TradeMenu/TradeMenu";

export const coinNotFoundErrorMessage =
  "No se ha encontrado una moneda con este nombre";

export const coinErrorMessage = "Ha ocurrido un error";

export const CoinPage = () => {
  const urlParams = useParams();
  const name = urlParams.coin;
  const data = useGetPrice("10s", `${name}BUSD`, true);
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "18% 42% 40%",
              md: "10% 39% 51%",
              lg: "10% 39% 51%",
              xl: "7% 42% 51%",
            },
            marginBottom: 5,
          }}
        >
          <Box sx={{ gridColumn: 1, display: "grid", placeContent: "center" }}>
            <CoinLogo coin={name} size="xl" />
          </Box>
          <Box
            sx={{
              gridColumn: 2,
              verticalAlign: "middle",
            }}
          >
            <Typography
              component="h1"
              sx={{
                textAlign: "left",
                typography: {
                  xs: "display3",
                  md: "display3",
                  lg: "display2",
                  xl: "display2",
                },
              }}
            >
              {name}
            </Typography>
          </Box>

          {data.data.length > 0 && (
            <Typography
              data-testid={`${name}Price`}
              sx={{
                gridColumn: 3,
                textAlign: "right",
                alignSelf: "center",
                typography: {
                  xs: "display4",
                  md: "display3",
                  lg: "display2",
                  xl: "display2",
                },
              }}
            >
              {`${data.data[data.data.length - 1]}$`}
            </Typography>
          )}
        </Box>

        {data.loading ? (
          <Box sx={{ display: "grid", placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : data.error && data.statusCode === 404 ? (
          <ErrorMessage message={coinNotFoundErrorMessage} center={true} />
        ) : data.error ? (
          <ErrorMessage message={coinErrorMessage} center={true} />
        ) : (
          <Box
            sx={{
              display: { xs: "block", md: "grid", lg: "grid", xl: "grid" },
              gridTemplateColumns: {
                md: "69% 4% 27%",
                lg: "66% 4% 30%",
                xl: "60% 8% 30%",
              },
              placeContent: "center",
            }}
          >
            <Box
              element="div"
              data-testid={`${name}Graph`}
              sx={{
                borderRadius: "12px",
                marginBottom: { xs: "40px", md: "0", lg: "0", xl: "0" },
                gridColumn: 1,
                display: "grid",
                placeContent: "center",
              }}
            >
              <Chart data={data.data} refresh={true} />
            </Box>
            <Box sx={{ gridColumn: 3 }}>
              <TradeMenu
                price={data.data[data.data.length - 1]}
                coin={name}
                chartData={data.data}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
