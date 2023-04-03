import { Box, Typography } from "@mui/joy";
export const MainPageSection = ({title, img, text, alt}) => {
  return (
    <Box
      sx={{
        marginTop: { xs: "40px", md: "40px", lg: "70px", xl: "90px" },
        display: { xs: "flex", md: "flex", lg: "grid", xl: "grid" },
        gridTemplateColumns: { lg: "60% 40%", xl: "60% 40%" },
        justifyContent: { xs: "center", md: "center" },
        flexWrap: { xs: "wrap", md: "center" },
      }}
    >
      <Box
        sx={{
          marginBottom: "20px",
          placeItems: "center",

          width: { xs: "300px", md: "400px", lg: "80%", xl: "80%" },
        }}
      >
        <img
          src={img}
          alt={alt}
          width="100%"
        ></img>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Typography
          sx={{
            marginBottom: {
              xs: "10px",
              md: "20px",
              lg: "20px",
              xl: "20px",
            },
            typography: { xs: "h2", md: "h2", lg: "h2", xl: "h2" },
          }}
          component="p"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            marginBottom: "4vh",
            typography: { xs: "body", md: "body", lg: "p", xl: "p" },
          }}
          component="p"
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
