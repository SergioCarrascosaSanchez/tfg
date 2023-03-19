import { UserAvatar } from "../UserAvatar/UserAvatar";
import { Card, Box, Typography } from "@mui/joy";

export const StudentSummaryCard = ({ username, tradeHistory }) => {
  return (
    <Card
      key={`${username}ResumeCard`}
      variant="outlined"
      sx={{ my:"10px", maxWidth: "400px", py:"30px" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "22% 78%",
          gap: 0,
          marginBottom: 2,
        }}
      >
        <Box sx={{ gridColumn: 1, display: "grid", placeContent: "left" }}>
          <UserAvatar username={username} />
        </Box>
        <Typography
          level="h2"
          component="h2"
          sx={{ gridColumn: 2, textAlign: "left" }}
        >
          {username}
        </Typography>
      </Box>
      <Typography
          level="p"
          component="p"
          sx={{ mx:"7px" }}
        >
          {`Transacciones: ${tradeHistory.length}`}
        </Typography>
    </Card>
  );
};
