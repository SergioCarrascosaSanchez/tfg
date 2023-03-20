import { Typography, Box } from "@mui/joy";
export const TradeTypeChip = ({type}) => {
  return (
    <Box sx={{ maxWidth: "35px", display: "grid", placeContent: "center" }}>
      {type === "BUY" ? (
        <Typography
          level="p2"
          component="p2"
          color="sucess"
          sx={{
            px: "10px",
            py: "5px",
            backgroundColor: "#D7F5DD",
            borderRadius: "5px",
          }}
        >
          Compra
        </Typography>
      ) : (
        <Typography
          level="p2"
          component="p2"
          color="danger"
          sx={{
            px: "10px",
            py: "5px",
            backgroundColor: "#FFC7C5",
            borderRadius: "5px",
          }}
        >
          Venta
        </Typography>
      )}
    </Box>
  );
};
