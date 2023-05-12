import { Chart } from "../../components/Chart/Chart";
import { Box, Typography, Card } from "@mui/joy";
import { useGetPrice } from "../../hooks/useGetPrice";
import CircularProgress from "@mui/joy/CircularProgress";
import { CoinLogo } from "../CoinLogo/CoinLogo";

export const CoinChartCardErrorMessage = "Ha ocurrido un error con ";
export const CoinChartCardQuantityText = "Cantidad: "
export const CoinChartCard = ({ name, time, quantity }) => {
  const data = useGetPrice(`${time}`, `${name}BUSD`);
  return (
    <Card
      key={`${name}Card`}
      component="li"
      variant="outlined"
      data-testid={`${name}CoinChartCard`}
      sx={{
        width: { xs: "260px", md: "265px", lg: "90%", xl: "90%" },
        minWidth: { lg: "380px", xl: "300px" },
      }}
    >
      {data.loading ? (
        <Box
          sx={{
            py: "50px",
            display: "grid",
            placeContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : data.error ? (
        <Typography level="display4" component="h2">
          {`${CoinChartCardErrorMessage}${name}`}
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "18% 42% 40%",
              gap: 0,
            }}
          >
            <Box
              sx={{ gridColumn: 1, display: "grid", placeContent: "center" }}
            >
              <CoinLogo coin={name} size="xs" />
            </Box>

            <Typography
              component="h2"
              sx={{
                gridColumn: 2,
                textAlign: "left",
                typography: {
                  xs: "display4",
                  md: "h2",
                  lg: "h2",
                  xl: "h2",
                },
              }}
            >
              {name}
            </Typography>

            <Typography
              component="h2"
              sx={{
                gridColumn: 3,
                textAlign: "right",
                typography: {
                  xs: "display4",
                  md: "display4",
                  lg: "h2",
                  xl: "h2",
                },
              }}
            >
              {data.data[data.data.length - 1]}
            </Typography>
          </Box>
          {quantity && (
            <Box
              sx={{
                textAlign: "right",
                marginTop: {
                  xs: "0px",
                  md: "0px",
                  lg: "4px",
                  xl: "4px",
                },
                marginBottom: 2,
              }}
            >
              <p>{`${CoinChartCardQuantityText}${quantity}`}</p>
            </Box>
          )}

          <Box
            element="div"
            data-testid={`${name}Graph`}
            sx={{
              width: { xs: "230px", md: "250px", lg: "280px", xl: "280px" },
              height: "auto",
              margin: "auto",
              borderRadius: "12px",
              dispay: "grid",
              placeContent: "center",
            }}
          >
            <Chart data={data.data} refresh={false} />
          </Box>
        </>
      )}
    </Card>
  );
};
