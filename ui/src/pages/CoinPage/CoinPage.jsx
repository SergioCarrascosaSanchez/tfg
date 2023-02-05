import { Navbar } from "../../components/Navbar/Navbar";
import { Chart } from "../../components/Chart/Chart";
import { Box, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { useParams } from "react-router-dom";
import { useGetPrice } from "../../hooks/useGetPrice";
import CircularProgress from "@mui/joy/CircularProgress";

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
      <Box sx={{ mx: "20vw", my: "5vh", maxWidth: "1000px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "18% 42% 40%",
            gap: 0,
            marginBottom: 5,
          }}
        >
          <Avatar
            alt={String(name)}
            src={`/static/CoinLogos/${name}.png `}
            size="xl"
            sx={{ gridColumn: 1, margin: "auto" }}
          />

          <Typography
            level="display2"
            component="h1"
            sx={{ gridColumn: 2, textAlign: "left", verticalAlign: "middle" }}
          >
            {name}
          </Typography>

          {data.data.length > 0 && (
            <Typography
              level="display2"
              data-testid={`${name}Price`}
              sx={{ gridColumn: 3, textAlign: "right" }}
            >
              {`${data.data[data.data.length - 1]} $`}
            </Typography>
          )}
        </Box>

        {data.loading ? (
          <Box sx={{ display: "grid", placeContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : data.error && data.statusCode === 404 ? (
          <Box sx={{ display: "grid", placeContent: "center" }}>
            <Typography level="p" component="p" textColor="neutral.500">
              {coinNotFoundErrorMessage}
            </Typography>
          </Box>
        ) : data.error ? (
          <Box sx={{ display: "grid", placeContent: "center" }}>
            <Typography level="p" component="p" textColor="neutral.500">
              {coinErrorMessage}
            </Typography>
          </Box>
        ) : (
          <Box
            element="div"
            data-testid={`${name}Graph`}
            sx={{
              maxWidth: "1000px",
              borderRadius: "12px",
              dispay: "grid",
              placeContent: "center",
            }}
          >
            <Chart data={data.data} refresh={true} />
          </Box>
        )}
      </Box>
    </>
  );
};
