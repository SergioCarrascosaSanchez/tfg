import MarketImage from "../../assets/MainPage_Market_ScreenShot.png";
import TeacherImage from "../../assets/MainPage_TeacherTrades_ScreenShot.png";
import { Navbar, appName } from "../../components/Navbar/Navbar";
import { Box, Button, Typography, Modal, ModalDialog } from "@mui/joy";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import { MainPageSection } from "../../components/MainPageSection/MainPageSection";

export const mainPageTexts = {
  title: `${appName}, la aplicación de trading educativa`,
  mainText:
    "Observa las operaciones de tus estudiantes de una forma sencilla y rápida",
  marketScreenshotTitle: "Compra y vende criptomonedas",
  marketScreenshotText:
    "Están disponibles todas los criptodivisas del mercado, con actualización en tiempo real.",
  TeacherScreenshotTitle: "Operaciones con todos los detalles",
  TeacherScreenshotText:
    "Cada operación realizada por un alumno incluye el activo, el gráfico, el precio, la cantidad, la fecha y una justificación.",
};
export const MainPageAltImages = {
  MarketImage: "Captura de pantalla de la página de mercados",
  TeacherImage:
    "Captura de pantalla de las operaciones que han hecho los alumnos",
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
        <Box sx={{marginBottom:"50px"}}>
        <MainPageSection
          title={mainPageTexts.marketScreenshotTitle}
          text={mainPageTexts.marketScreenshotText}
          img={MarketImage}
          alt={MainPageAltImages.MarketImage}
        />
        <MainPageSection
          title={mainPageTexts.TeacherScreenshotTitle}
          text={mainPageTexts.TeacherScreenshotText}
          img={TeacherImage}
          alt={MainPageAltImages.TeacherImage}
        />
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
