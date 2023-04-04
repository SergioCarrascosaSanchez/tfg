import { Typography, Box, TextField, Textarea, Button } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useTradeCoin } from "../../hooks/useTradeCoin";

export const TradeMenuTitle = "Transacción";
export const TradeMenuAuthError =
  "No tienes autorización para realizar esta operación";
export const TradeMenuNotEnoughError = "No tienes suficiente cantidad del activo o dinero para completar la operación"
const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export const TradeMenu = ({ price, coin, chartData }) => {
  const [quantity, setQuantity] = useState(0);
  const [justification, setJustification] = useState("");
  const [incorrectQuantity, setIncorrectQuantity] = useState(false);
  const [incorrectJustification, setIncorrectJustification] = useState(false);;

  const username = localStorage.getItem("username");

  const { loading, error, statusCode, TradeCoin } = useTradeCoin();

  async function handleSubmit(event) {
    let correct = true;
    setIncorrectQuantity(false);
    setIncorrectJustification(false);
    if (quantity <= 0) {
      setIncorrectQuantity(true);
      correct = false;
    }
    if (justification === "") {
      setIncorrectJustification(true);
      correct = false;
    }
    if (correct) {
      if (event.target.name === "PurchaseButton") {
        await TradeCoin(
          "purchase",
          username,
          coin,
          quantity,
          price,
          justification,
          chartData
        );
      } else {
        await TradeCoin(
          "sell",
          username,
          coin,
          quantity,
          price,
          justification,
          chartData
        );
      }
    }
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
      {error && (
        <ErrorMessage
          message={"Error al ejecutar la transaccion"}
          form={true}
        />
      )}
      {error && statusCode === 403 && (
        <ErrorMessage message={TradeMenuAuthError} form={true} />
      )}
      {error && statusCode === 402 && (
        <ErrorMessage message={TradeMenuNotEnoughError} form={true} />
      )}
      {statusCode === 200 && (
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
      <Button
        loading={loading}
        variant="solid"
        color="success"
        onClick={handleSubmit}
        name="PurchaseButton"
        data-testid="PurchaseButton"
      >
        Comprar
      </Button>
      <Button
        loading={loading}
        variant="solid"
        color="danger"
        onClick={handleSubmit}
        name="SellButton"
        data-testid="SellButton"
      >
        Vender
      </Button>
    </Box>
  );
};
