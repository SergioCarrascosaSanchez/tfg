import { Typography, Box, TextField, Textarea, Button } from "@mui/joy";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useBuyCoin } from "../../hooks/useBuyCoin";

export const PurchaseMenuTitle = "Transacción";

export const PurchaseMenu = () => {
  const [quantity, setQuantity] = useState(0);
  const [justification, setJustification] = useState("");
  const [incorrectQuantity, setIncorrectQuantity] = useState(false);
  const [incorrectJustification, setIncorrectJustification] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [successfulPurchase, setSuccessfulPurchase] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (successfulPurchase) {
      const timeoutId = setTimeout(() => {
        setSuccessfulPurchase(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [successfulPurchase]);

  const handleSubmit = async () => {
    setLoading(true);
    if ((quantity <= 0) && (justification === "")){
      setIncorrectQuantity(true);
      setIncorrectJustification(true)
    }
    else if (quantity <= 0) {
      setIncorrectQuantity(true);
      setIncorrectJustification(false)
    } 
    else if (justification === ""){
      setIncorrectJustification(true)
      setIncorrectQuantity(false);
    }
    else {
      setIncorrectQuantity(false);
      setIncorrectJustification(false)
      const data = useBuyCoin();
      data.statusCode === 200 ? (
        setSuccessfulPurchase(true)
      ) : (
        setPurchaseError(true)
      )
    }
    setLoading(false);
  };
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
        {PurchaseMenuTitle}
      </Typography>
      {incorrectQuantity && (
        <ErrorMessage message={"Cantidad no valida"} form={true}/>
      )}
      {incorrectJustification && (
        <ErrorMessage message={"La justificacion es obligatoria"} form={true}/>
      )}
      {purchaseError && (
        <ErrorMessage message={"Error al ejecutar la transaccion"} form={true}/>
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
        <Button variant="solid" onClick={handleSubmit}>
          Comprar
        </Button>
      )}
    </Box>
  );
};
