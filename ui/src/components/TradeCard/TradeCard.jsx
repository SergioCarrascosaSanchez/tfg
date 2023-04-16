import { Typography, Box, Card } from "@mui/joy";
import { Chart } from "../Chart/Chart";
import { TradeTypeChip } from "../TradeTypeChip/TradeTypeChip";
import { CoinLogo } from "../CoinLogo/CoinLogo";
import { TeacherFeedback } from "../TeacherFeedback/TeacherFeedback";

export const TradeCard = ({ username, trade, index }) => {
  return (
    <Card
      sx={{
        p: {
          xs: 2,
          md: 4,
          lg: 4,
          xl: 4,
        },
        my: {
          xs: 2,
          md: 3,
          lg: 3,
          xl: 3,
        },
        mx: {
          xs: 0,
          md: 3,
          lg: 3,
          xl: 3,
        },
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: {
            xs: "block",
            md: "grid",
            lg: "grid",
            xl: "grid",
          },
          gridTemplateColumns: "50% 50%",
          gap: {
            xs: 0,
            md: 7,
            lg: 7,
            xl: 9,
          },
        }}
      >
        <Box
          data-testid={`${username}TradeChart${index}`}
          sx={{
            gridColumn: 1,
            minWidth: {
              xs: "300px",
              md: "350px",
              lg: "350px",
              xl: "350px",
            },
            marginBottom: {
              xs: "20px",
              md: "0px",
              lg: "0px",
              xl: "0px",
            },
          }}
        >
          <Chart refresh={true} data={trade.chartData} />
        </Box>
        <Box sx={{ gridColumn: 2 }}>
          <Box
            sx={{
              display: "grid",

              placeContent: "left",
              gridTemplateColumns: {
                xs: "43% 57%",
                md: "45% 55%",
                lg: "40% 60%",
                xl: "37% 63%",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridColumn: 1,
                gridTemplateColumns: "50% 50%",
                gap: 0,
                width: "90px",
              }}
            >
              <Box
                sx={{ gridColumn: 1, display: "grid", placeContent: "left" }}
                data-testid={`${username}Trade${index}Coin${trade.coin}`}
              >
                <CoinLogo coin={trade.coin} size="xs" />
              </Box>
              <Typography
                level="p"
                component="p"
                sx={{ gridColumn: 2, textAlign: "left", lineHeight: "30px" }}
              >
                {trade.coin}
              </Typography>
            </Box>
            <Box sx={{ gridColumn: 2 }}>
              <TradeTypeChip type={trade.type} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "50% 50%",
                md: "repeat( auto-fit, max(150px) )",
                lg: "repeat( auto-fit, max(175px) )",
                xl: "repeat( auto-fit, max(175px) )",
              },
              py: 1,
            }}
          >
            <Typography
              level="body2"
              component="p"
              sx={{
                maxWidth: "80%",
                gridColumn: 1,
                textAlign: {
                  xs: "left",
                  md: "left",
                  lg: "left",
                  xl: "left",
                },
              }}
            >
              {`Cantidad: ${trade.quantity}`}
            </Typography>
            <Typography
              level="body2"
              component="p"
              sx={{
                maxWidth: "80%",
                gridColumn: 2,
                textAlign: {
                  xs: "right",
                  md: "left",
                  lg: "left",
                  xl: "left",
                },
              }}
            >
              {`Precio: ${trade.price}`}
            </Typography>
          </Box>

          <Typography
            level="body"
            component="p"
            sx={{
              maxWidth: {
                xs: "100%",
                md: "84%",
                lg: "86%",
                xl: "80%",
              },
              textAlign: "justify",
            }}
          >
            {trade.justification}
          </Typography>
          <Typography
            level="body1"
            component="p"
            sx={{ maxWidth: "80%", paddingTop: 1 }}
            textColor="neutral.500"
          >
            {trade.date}
          </Typography>
        </Box>
      </Box>
      <TeacherFeedback
            comment={trade.feedback}
            role={"TEACHER"}
            student={username}
            tradeId={trade.id}
          />
    </Card>
  );
};
