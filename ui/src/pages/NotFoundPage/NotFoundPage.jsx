import { Box } from "@mui/joy";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Navbar } from "../../components/Navbar/Navbar";

export const NotFoundPageText = "Esta página no existe";

export const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{marginTop: {
        xs:"10%",
        md:"10%",
        lg:"100px",
        xl:"100px"
      }}}>
        <ErrorMessage center={true} message={NotFoundPageText} />
      </Box>
    </>
  );
};
