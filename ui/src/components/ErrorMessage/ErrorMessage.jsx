import { Box, Typography } from "@mui/joy";

export const ErrorMessage = ({ message, center }) => {
  if (center) {
    return (
      <Box sx={{ display: "grid", placeContent: "center" }}>
        <Typography level="p" component="p" textColor="neutral.500">
          {message}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Typography level="p" component="p" textColor="neutral.500">
        {message}
      </Typography>
    );
  }
};
