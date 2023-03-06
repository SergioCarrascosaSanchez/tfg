import { Box, Typography } from "@mui/joy";

export const ErrorMessage = ({ message, center, form }) => {
  if (form) {
    return (
      <Typography level="p2" textColor="red">
        {message}
      </Typography>
    );
  } else {
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
  }
};
