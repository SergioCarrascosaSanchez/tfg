import { Sheet, Typography, Box } from "@mui/joy";
import GithubImage from "../../assets/githubLogo.png";
import { Link } from "react-router-dom";

export const options = {
  Home: "/",
  Mercados: "/market",
  "Mi perfil": "/users/",
};
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
              {Object.keys(options).map((option) => (
                <Link
                  key={`${option}Navbar`}
                  to={
                    option === "Mi perfil"
                      ? `${options[option]}${localStorage.getItem("username")}`
                      : options[option]
                  }
                >
                  <Box sx={{ display: "inline-block" }}>
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
                </Link>
              ))}
            </>
          )}

          <Box sx={{ marginLeft: "80px" }}>
            <a href="https://github.com/SergioCarrascosaSanchez/tfg">
              <img
                src={GithubImage}
                data-testid={"githubImage"}
                width="30px"
                height="auto"
              ></img>
            </a>
          </Box>
        </Box>
      </Box>
    </Sheet>
  );
};
