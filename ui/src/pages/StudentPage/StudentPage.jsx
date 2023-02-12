import { Navbar } from "../../components/Navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import { CircularProgress, Box } from "@mui/joy";
import { useGetUserData } from "../../hooks/useGetUserData";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { CoinChartCard } from "../../components/CoinChartCard/CoinChartCard";

export const StudentPageError =
  "Ha ocurrido un error obteniendo la información del estudiante";

export const StudentInvestmentsTitle = "Mis inversiones";

export const StudentPage = () => {
  const student = useParams().student;
  const userData = useGetUserData();
  return (
    <>
      <Navbar />
      {userData.loading ? (
        <>
          <h1>{student}</h1>
          <CircularProgress />
        </>
      ) : userData.error ? (
        <>
          <h1>{student}</h1>
          <ErrorMessage message={StudentPageError} center={true} />
        </>
      ) : (
        <>
          <h1>{student}</h1>
          <h2>{`Balance: ${userData.data.balance}$`}</h2>
          <h2>{StudentInvestmentsTitle}</h2>
          {userData.data.coins.map((investment) => {
            return <CoinChartCard name={investment.coin} time={"30m"} />;
          })}
          {/*Tengo que hacer un componente genérico que se llame CoinChartCardList*/}
        </>
      )}
    </>
  );
};
