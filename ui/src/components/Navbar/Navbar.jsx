import { Sheet, Typography, Box } from "@mui/joy";

export const options = ["Home", "Mercados", "Mi perfil"];
export const appName = "CryptoMince";

export const Navbar = () => {
  return (
    <Sheet color="primary" variant="solid">
      <Box
        component="ol"
        sx={{
          marginLeft: "14%",
          marginRight: "14%",
          display: "grid",
          gridTemplateColumns: "10% 90%",
          listStyle: "none",
          padding: "8px",
          height: "40px",
        }}
      >
        <Box component="li">
          <Typography
            textColor="white"
            level="h2"
            data-testid={`${appName}Navbar`}
            sx={{ gridColumn: 1 }}
          >
            {appName}
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumn: 2,
            justifySelf: "right",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {window.location.pathname !== "/" && (
            <>
              {options.map((option) => (
                <Box key={`${option}Navbar}`} sx={{ display: "inline-block" }}>
                  <Typography
                    textColor="white"
                    component="li"
                    level="body"
                    data-testid={`${option}Navbar`}
                    sx={{ marginLeft: "80px", lineHeight: "40px" }}
                  >
                    {option}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Sheet>
  );
};