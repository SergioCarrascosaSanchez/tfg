import { Sheet, Typography, Box } from "@mui/joy";
import GithubImage from "../../assets/githubLogo.png";
import { Link } from "react-router-dom";

export const options = {
  Mercados: "/market",
  "Mi perfil": "/users/",
  "Cerrar sesión": "/",
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
          gridTemplateColumns: {
            xs: window.location.pathname !== "/" ? "0% 100%" : "10% 90%",
            md: "30% 70%",
            lg: "10% 90%",
            xl: "10% 90%",
          },
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
            sx={{
              gridColumn: 1,
              display: {
                xs: window.location.pathname !== "/" ? "none" : "block",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            {appName}
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumn: 2,
            justifySelf: {
              xs: window.location.pathname !== "/" ? "space-between" : "right",
              md: "right",
              lg: "right",
              xl: "right",
            },
            display: {
              xs: window.location.pathname !== "/" ? "flex" : "flex",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            justifyContent: {
              xs: window.location.pathname !== "/" ? "space-between" : "center",
              md: "center",
              lg: "center",
              xl: "center",
            },
            alignItems: {
              xs: window.location.pathname !== "/" ? "space-between" : "center",
              md: "center",
              lg: "center",
              xl: "center",
            },
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
                      sx={{ marginLeft: {
                        xs: window.location.pathname !== "/" ? "" : "80px",
                        md: "35px",
                        lg: "80px",
                        xl: "80px",
                      }, lineHeight: "40px", display:"flex" }}
                    >
                      {option}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </>
          )}

          <Box
            sx={{
              marginLeft: "80px",
              display: {
                xs: window.location.pathname !== "/" ? "none" : "block",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
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
