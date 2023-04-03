import MarketImage from "../../assets/MainPage_Market_ScreenShot.jpg";
import { Navbar, appName } from "../../components/Navbar/Navbar";
import { Box, Button, Typography, Modal, ModalDialog } from "@mui/joy";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useState } from "react";

export const mainPageTexts = {
  title: `${appName}, la aplicación de trading educativa`,
  mainText:
    "Observa las operaciones de tus estudiantes de una forma sencilla y rápida",
  marketScreenshotTitle: "Compra y vende criptomonedas",
  marketScreenshotText:
    "Están disponibles todas los criptodivisas del mercado, con actualización en tiempo real.",
};
export const MainPageAltImages = {
  MarketImage: "Captura de pantalla de la página de mercados",
};

export const MainPage = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("username");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          placeItems: "center",
          marginTop: "50px",
          mx: { xs: "50px", md: "200px", lg: "200px", xl: "300px" },
          textAlign: "center",
          marginBottom: "100px",
        }}
      >
        <Typography
          component="h1"
          sx={{
            typography: {
              xs: "display3",
              md: "display2",
              lg: "display2",
              xl: "display1",
            },
            marginBottom: { xs: "20px", md: "20px", lg: "20px", xl: "20px" },
          }}
        >
          {mainPageTexts.title}
        </Typography>
        <Typography
          sx={{
            marginBottom: "4vh",
            typography: { xs: "p2", md: "p", lg: "p", xl: "p" },
          }}
          component="p"
        >
          {mainPageTexts.mainText}
        </Typography>
        <Button size="lg" onClick={handleClick}>
          Iniciar sesión
        </Button>
        <Box
          sx={{
            marginTop: { xs: "40px", md: "40px", lg: "70px", xl: "90px" },
            display: { xs:"flex", md:"flex", lg: "grid", xl: "grid" },
            gridTemplateColumns: { lg: "60% 40%", xl: "60% 40%" },
            justifyContent: { xs:"center", md:"center"},
            flexWrap: { xs:"wrap", md:"center"}
          }}
        >
          <Box
            sx={{
              marginBottom: "20px",
              placeItems:"center",

              width: { xs: "300px", md: "400px", lg: "500px", xl: "80%" },
            }}
          >
            <img
              src={MarketImage}
              alt={MainPageAltImages.MarketImage}
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
              {mainPageTexts.marketScreenshotTitle}
            </Typography>
            <Typography
              sx={{
                marginBottom: "4vh",
                typography: { xs: "body", md: "body", lg: "p", xl: "p" },
              }}
              component="p"
            >
              {mainPageTexts.marketScreenshotText}
            </Typography>
          </Box>
        </Box>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            sx={{
              minWidth: "325px",
              width: "23vw",
              borderRadius: "md",
              p: { xs: 0, md: 2, lg: 1, xl: 2 },
              boxShadow: "lg",
            }}
          >
            <LoginForm />
          </ModalDialog>
        </Modal>
      </Box>
    </>
  );
};
