import { Typography, List } from "@mui/joy";
import { TradeCard } from "../TradeCard/TradeCard";

export const NoTradesMessage = "No hay transacciones";

export const StudentTradingInfo = ({ info, username }) => {
  return (
    <>
      {info.length > 0 ? (
        <>
          <Typography
            component="h2"
            sx={{
              paddingBottom: {
                xs: "10px",
                md: "10px",
                lg: "15px",
                xl: "15px",
              },
              paddingTop: "20px",
              typography: {
                xs: "display4",
                md: "h2",
                lg: "h2",
                xl: "h2",
              },
              mx: {
                xs: 0,
                md: 3,
                lg: 3,
                xl: 3,
              },
            }}
          >
            {`Transacciones de ${username}`}
          </Typography>
          <List
            sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "80vh" }}
          >
            {info
              .sort((a, b) => (a.id > b.id ? -1 : 1))
              .map((trade) => (
                <TradeCard
                  key={`${username}TradeCard${trade.id}`}
                  trade={trade}
                  username={username}
                  id={trade.id}
                  role={"TEACHER"}
                />
              ))}
          </List>
        </>
      ) : (
        <Typography level="p" component="p" textColor="neutral.500">
          {NoTradesMessage}
        </Typography>
      )}
    </>
  );
};
