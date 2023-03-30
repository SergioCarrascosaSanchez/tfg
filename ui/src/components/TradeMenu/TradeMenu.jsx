import { Typography, Box, TextField, Textarea, Button } from "@mui/joy";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useTradeCoin } from "../../hooks/useTradeCoin";

export const TradeMenuTitle = "Transacción";
export const TradeMenuAuthError = "No tienes autorización para realizar esta operación";
const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export const TradeMenu = ({ price, coin, chartData }) => {
  const [quantity, setQuantity] = useState(0);
  const [justification, setJustification] = useState("");
  const [incorrectQuantity, setIncorrectQuantity] = useState(false);
  const [incorrectJustification, setIncorrectJustification] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [successfulPurchase, setSuccessfulPurchase] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const {BuyCoin, SellCoin} = useTradeCoin();
  useEffect(() => {
    if (successfulPurchase) {
      const timeoutId = setTimeout(() => {
        setSuccessfulPurchase(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [successfulPurchase]);

  async function handleSubmit(event) {
    setLoading(true);
    if (quantity <= 0 && justification === "") {
      setIncorrectQuantity(true);
      setIncorrectJustification(true);
    } else if (quantity <= 0) {
      setIncorrectQuantity(true);
      setIncorrectJustification(false);
    } else if (justification === "") {
      setIncorrectJustification(true);
      setIncorrectQuantity(false);
    } else {
      setIncorrectQuantity(false);
      setIncorrectJustification(false);
      let data;
      if(event.target.name === "PurchaseButton"){
        data = await BuyCoin(username, coin, quantity, price, justification, chartData);
      }
      else{
        data = await SellCoin(username, coin, quantity, price, justification, chartData);
      }
      if (data.statusCode === 200) {
        setSuccessfulPurchase(true);
        setPurchaseError(false);
      } else if (data.statusCode === 403){
        setPurchaseError(false);
        setAuthError(true)
      }else {
        setPurchaseError(true);
        setSuccessfulPurchase(false);
      }
    }
    setLoading(false);
  }
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography sx={{ lineHeight: "15px" }} level="h2">
        {TradeMenuTitle}
      </Typography>
      {incorrectQuantity && (
        <ErrorMessage message={"Cantidad no valida"} form={true} />
      )}
      {incorrectJustification && (
        <ErrorMessage message={"La justificacion es obligatoria"} form={true} />
      )}
      {purchaseError && (
        <ErrorMessage
          message={"Error al ejecutar la transaccion"}
          form={true}
        />
      )}
      {authError && (
        <ErrorMessage
          message={TradeMenuAuthError}
          form={true}
        />
      )}
      {successfulPurchase && (
        <Typography level="p2" textColor="green">
          Transacción realizada con éxito!
        </Typography>
      )}
      <TextField
        name="quantity"
        placeholder="Cantidad"
        variant="outlined"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Textarea
        name="justification"
        placeholder="Justificacion"
        minRows={5}
        onChange={(e) => setJustification(e.target.value)}
      />
      {loading ? (
        <Button variant="solid" onClick={handleSubmit} loading></Button>
      ) : (
        <Button
          variant="solid"
          color="success"
          onClick={handleSubmit}
          name="PurchaseButton"
          data-testid="PurchaseButton"
        >
          Comprar
        </Button>
      )}
      {loading ? (
        <Button variant="solid" onClick={handleSubmit} loading></Button>
      ) : (
        <Button
          variant="solid"
          color="danger"
          onClick={handleSubmit}
          name="SellButton"
          data-testid="SellButton"
        >
          Vender
        </Button>
      )}
    </Box>
  );
};
