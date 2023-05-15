import { Typography, Box, TextField, Textarea, Button } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useTradeCoin } from "../../hooks/useTradeCoin";

export const TradeMenuMessages = {
  IncorrectQuantity: "Cantidad no valida",
  IncorrectJustification: "La justificacion es obligatoria",
  NotEnough:
    "No tienes suficiente cantidad del activo o dinero para completar la operación",
  Auth: "No tienes autorización para realizar esta operación",
  GenericError: "Error al ejecutar la transaccion",
  SuccessfulTrade: "Transacción realizada con éxito!",
};
export const TradeMenuTexts = {
  Title: "Transacción",
};

export const TradeMenuElements = {
  PurchaseButton: "PurchaseButton",
  SellButton: "SellButton",
  QuantityPlaceholder: "Cantidad",
  JustificationPlaceholder: "Justificacion",
};

export const TradeMenu = ({ price, coin, chartData }) => {
  const [quantity, setQuantity] = useState(0);
  const [justification, setJustification] = useState("");
  const [incorrectQuantity, setIncorrectQuantity] = useState(false);
  const [incorrectJustification, setIncorrectJustification] = useState(false);

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
      if (event.target.name === TradeMenuElements.PurchaseButton) {
        await TradeCoin(
          "BUY",
          username,
          coin,
          quantity,
          price,
          justification,
          chartData
        );
      } else {
        await TradeCoin(
          "SELL",
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
      <Typography
        sx={{
          lineHeight: "15px",
          typography: {
            xs: "display4",
            md: "h2",
            lg: "h2",
            xl: "display3",
          },
        }}
        level="h2"
      >
        {TradeMenuTexts.Title}
      </Typography>
      {incorrectQuantity && (
        <ErrorMessage
          message={TradeMenuMessages.IncorrectQuantity}
          form={true}
        />
      )}
      {incorrectJustification && (
        <ErrorMessage
          message={TradeMenuMessages.IncorrectJustification}
          form={true}
        />
      )}
      {error && (
        <ErrorMessage message={TradeMenuMessages.GenericError} form={true} />
      )}
      {error && statusCode === 403 && (
        <ErrorMessage message={TradeMenuMessages.Auth} form={true} />
      )}
      {error && statusCode === 402 && (
        <ErrorMessage message={TradeMenuMessages.NotEnough} form={true} />
      )}
      {statusCode === 200 && (
        <Typography level="p2" textColor="green">
          {TradeMenuMessages.SuccessfulTrade}
        </Typography>
      )}
      <TextField
        name="quantity"
        placeholder={TradeMenuElements.QuantityPlaceholder}
        variant="outlined"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Textarea
        name="justification"
        placeholder={TradeMenuElements.JustificationPlaceholder}
        minRows={5}
        onChange={(e) => setJustification(e.target.value)}
      />
      <Button
        loading={loading}
        variant="solid"
        color="success"
        onClick={handleSubmit}
        name={TradeMenuElements.PurchaseButton}
        data-testid={TradeMenuElements.PurchaseButton}
      >
        Comprar
      </Button>
      <Button
        loading={loading}
        variant="solid"
        color="danger"
        onClick={handleSubmit}
        name={TradeMenuElements.SellButton}
        data-testid={TradeMenuElements.SellButton}
      >
        Vender
      </Button>
    </Box>
  );
};
