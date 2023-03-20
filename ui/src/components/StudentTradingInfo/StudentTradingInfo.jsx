import { Typography, Box, Card, List } from "@mui/joy";
import { TradeCard } from "../TradeCard/TradeCard";

export const NoTradesMessage = "No hay transacciones";

export const StudentTradingInfo = ({ info, username }) => {
  return (
    <>
      {info.length > 0 ? (
        <>
        <Typography level="h2" component="h2" sx={{px:3, paddingBottom:"15px", paddingTop:"20px"}}>
          {`Transacciones de ${username}`}
        </Typography>
        <List
          sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "80vh" }}
        >
          {info.map((trade, index) => (
            <TradeCard
              key={`${username}TradeCard${index}`}
              trade={trade}
              username={username}
              index={index}
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
