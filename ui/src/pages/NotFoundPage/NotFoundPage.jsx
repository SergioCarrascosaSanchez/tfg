import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Navbar } from "../../components/Navbar/Navbar";

export const NotFoundPageText = "Esta página no existe";

export const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <ErrorMessage center={true} message={NotFoundPageText} />
    </>
  );
};
